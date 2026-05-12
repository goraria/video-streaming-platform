import { PrismaClient } from '@prisma/client/index';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

// if (process.env.NODE_ENV === 'production') {
//   // Production: create a single instance with optimized connection pool
//   prisma = global.prisma ?? new PrismaClient({
//     log: ['error']
//   });
//   if (!global.prisma) {
//     global.prisma = prisma;
//   }
// } else {
//   // Development: create a new instance with connection pool
//   prisma = global.prisma ?? new PrismaClient({
//     log: process.env.EXPRESS_NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   });
//   if (!global.prisma) {
//     global.prisma = prisma;
//   }
// }

export default prisma;
