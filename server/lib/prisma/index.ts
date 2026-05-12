// import "dotenv/config";
import dotenv from "dotenv";
// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from '@prisma/client/index';
// import { Pool } from 'pg'

dotenv.config({
	path: ".env.local",
	override: true,
	debug: false,
	quiet: true
})
// const connectionString = `${process.env.EXPRESS_PRIVATE_SUPABASE_DEMO_URL}`;
const connectionString = `${process.env.EXPRESS_PRIVATE_SUPABASE_DIRECT_URL}`;
// const connectionString = `${process.env.EXPRESS_PRIVATE_SUPABASE_URL}`
// const pool = new Pool({ connectionString })
// const adapter = new PrismaPg(pool)
// const prisma = new PrismaClient({ adapter })

// export { prisma }
