import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from "path";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import session from "express-session";
import pc from 'picocolors';
import { Logger } from "gorth-base/lib/logger";
import { createServer } from "http";
import { createRealtime } from '@/lib/supabase/realtime';

export default async function AppModule(): Promise<{
	app: ReturnType<typeof express>;
	listen: (port?: number | string) => Promise<void>;
}> {
	const timer = Date.now();
	const app = express();

	// ================================
	// 🌐 EXPRESS SERVER CONFIGURATION
	// ================================

	/* CONFIGURATIONS */
	dotenv.config({
		path: ".env.local",
		override: true,
		debug: false,
		quiet: true,
	});

	// app.use(express.json({
	app.use(express.urlencoded({
		extended: true,
		limit: '50mb',
	}));

	app.use(helmet());
	app.use(helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	}));
	// app.use(helmet({
	//   crossOriginResourcePolicy: { policy: "cross-origin" },
	//   contentSecurityPolicy: false, // Disable if causes issues with assets
	// }));

	morgan.token("response-time-ms", (req: Request, res: Response) => {
		const time = (morgan as any)['response-time'](req, res);
		if (!time) return "-";

		const num = parseFloat(time);
		return num >= 2000 
		? `${(num / 1000).toFixed(1)}s` 
		: `${Math.round(num)}ms`;
	});
	morgan.token("status-color", (req: Request, res: Response) => {
		const s = res.statusCode;
		switch (true) {
			case s >= 500:
				return pc.red(s);
			case s >= 400:
				return pc.yellow(s);
			case s >= 300:
				return pc.cyan(s);
			default:
				return pc.green(s);
		}
	});
	app.use(morgan(` :method :url :status-color in :response-time-ms ${pc.dim(`(HTTP/:http-version, [:date[clf]], content-length: :res[content-length])`)}`));
	// , process: :response-time-ms, :user-agent, :remote-addr, :remote-user, HTTP/:http-version, :referrer
	// app.use(morgan('common'));
	// app.use((req: Request, res: Response, next: NextFunction) => {
	//   const startTime = Date.now();

	//   res.on('finish', () => {
	//     const duration = Date.now() - startTime;
	//     const method = req.method;
	//     const url = req.url;
	//     const status = res.statusCode;
	//     const durationMs = `${duration}ms`;

	//     console.log(`${method} ${url} ${status} in ${durationMs}`);
	//   });

	//   next();
	// });

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false,
	}));

	app.use(cookieParser());
	app.use(session({
		secret: process.env.EXPRESS_JWT_SECRET!,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.EXPRESS_ENV === 'production',
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24,
			sameSite: 'lax',
			// expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Thời gian hết hạn cookie
			// domain: process.env.EXPRESS_CLIENT_URL!, // Tùy chọn: tên miền cookie
			// secure: true, // Chỉ gửi cookie qua HTTPS
			// sameSite: 'Lax' // Hoặc 'Strict'. 'None' cần secure: true
			// path: '/', // Phạm vi cookie (thường là gốc)
		},
	}));

	app.use(cors({
		origin: [
			process.env.EXPRESS_PUBLIC_CLIENT_URL!,
			process.env.EXPRESS_PUBLIC_MOBILE_URL!,
			process.env.EXPRESS_PUBLIC_LOCAL_URL!,
		], // .filter((value): value is string => Boolean(value)),
  	// origin: "*",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
		exposedHeaders: ['Set-Cookie'],
		maxAge: 86400,
  	// preflightContinue: false,
		optionsSuccessStatus: 204,
	}));

	/* ROUTES */
	app.get("/favicon.ico", (req: Request, res: Response) => {
		res.sendFile("favicon.ico", { root: path.resolve(process.cwd(), "api") });
	});

	app.get('/globals.css', (req: Request, res: Response) => {
		res.sendFile("globals.css", { root: path.resolve(process.cwd(), "api") });
	});

	app.get('/', (req: Request, res: Response) => {
		res.sendFile("index.html", { root: path.resolve(process.cwd(), "api") });
	});

	app.get('/api', (req: Request, res: Response) => {
		res.send('Professor Synapse API is running');
	});

	app.get('/health', (req: Request, res: Response) => {
		res.status(200).json({
			status: 'OK',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			memory: process.memoryUsage(),
		});
	});

	app.get('/param/:param', (req: Request, res: Response) => {
		const { param } = req.params;
		res.status(200).json({
			param,
		});
	});

	app.get('/query', (req: Request, res: Response) => {
		const { query } = req.query;
		res.status(200).json({
			query,
		});
	});

	app.use((req: Request, res: Response) => {
		res.status(404).json({
			error: 'Not Found',
			message: `Route ${req.method} ${req.url} not found`,
		});
	});

	app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
		console.log(Logger(`Error: ${error}`, 'error', 'red'));
		res.status(500).json({
			error: 'Internal Server Error',
			message: process.env.EXPRESS_ENV === 'production' ? 'Something went wrong' : error.message,
		});
	});

	const server = createServer(app);
	const defaultPort = Number(process.env.EXPRESS_PORT || 8080);
	app.use(createRealtime);

	const start = async (port: number = defaultPort) => {
		await new Promise<void>((resolve, reject) => {
			server.once('error', reject);
			server.listen(port, () => {
				server.off('error', reject);
				const readyTime = Date.now() - timer;
				const formattedTime = readyTime < 1000 ? `${readyTime}ms` : `${(readyTime / 1000).toFixed(2)}s`;
				console.log(Logger(`Ready in ${formattedTime}`, 'success', 'green'));
				resolve();
			});
		});
	};

	const shutdown = async () => {
		console.log("\b");
		server.close(() => {
			process.exit(0);
		});
	};

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
	process.on('SIGUSR2', shutdown);

	return {
		app,
		listen: async (port?: number | string) => {
			const resolvedPort = Number(port ?? defaultPort);
			await start(resolvedPort);
		},
	};
}
