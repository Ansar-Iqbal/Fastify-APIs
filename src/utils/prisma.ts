// Creating Prisma Connection
import { PrismaClient } from '@prisma/client';

//db renamed to prisma
const db = new PrismaClient();

export default db;