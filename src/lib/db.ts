import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  if (process.env.NODE_ENV === 'production') return new PrismaClient()
  
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const db = globalForPrisma.prisma ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db