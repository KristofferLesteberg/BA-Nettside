<<<<<<< HEAD

//Initilaze PrismaClient - and handling multiply connections to the database

import { PrismaClient } from "../../generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
=======
import { PrismaClient } from "../../generated/prisma"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db"
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
>>>>>>> database
