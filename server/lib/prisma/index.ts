// import "dotenv/config";
import dotenv from "dotenv";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client/index';
import { Pool } from 'pg'

dotenv.config({
	path: ".env.local",
	override: true,
	debug: false,
	quiet: true
})
// const connectionString = `${process.env.EXPRESS_PRIVATE_SUPABASE_DEMO_URL}`;
const connectionString = `${process.env.EXPRESS_PRIVATE_SUPABASE_DIRECT_URL}`;
// const connectionString = `${process.env.EXPRESS_PRIVATE_SUPABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export { prisma }


// import { PrismaClient } from '@prisma/client/index';

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// // Prisma Client singleton pattern for serverless environments
// // In serverless (Vercel), each function invocation may reuse the same container,
// // so we use global to prevent multiple Prisma Client instances
// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   // Production: create a single instance with optimized connection pool
//   prisma = global.prisma ?? new PrismaClient({
//     log: ['error'],
//     datasources: {
//       db: {
//         url: process.env.EXPRESS_PRIVATE_SUPABASE_URL,
//       },
//     },
//   });
//   if (!global.prisma) {
//     global.prisma = prisma;
//   }
// } else {
//   // Development: create a new instance with connection pool
//   prisma = global.prisma ?? new PrismaClient({
//     log: process.env.EXPRESS_NODE_ENV === "development" ? ["error", "warn"] : ["error"],
//     datasources: {
//       db: {
//         url: process.env.EXPRESS_PRIVATE_SUPABASE_URL,
//       },
//     },
//   });
//   if (!global.prisma) {
//     global.prisma = prisma;
//   }
// }

// export default prisma;

// import { PrismaClient } from '@prisma/client/index';
//
// declare global {
//   var prisma: PrismaClient | undefined;
// }
//
// // export const prisma =
// //   global.prisma ?? new PrismaClient({
// //     log: process.env.EXPRESS_NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
// //   });
// //
// // if (process.env.EXPRESS_NODE_ENV !== "production") global.prisma = prisma;
//
// let prisma: PrismaClient;
// if (!global.prisma) {
//   global.prisma = new PrismaClient();
// }
// prisma = global.prisma;
//
// export default prisma;
