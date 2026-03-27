
//Initilaze PrismaClient - and handling multiply connections to the database

import { PrismaClient } from "../../generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;