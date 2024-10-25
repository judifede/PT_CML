import { PrismaClient } from "@prisma/client"
export const prisma = new PrismaClient()

import db_c0 from './db_c0.json' assert { type: 'json' }
import db_c1 from './db_c1.json' assert { type: 'json' }


export const resetDB = async () => {
  try {
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Phrase'`

    await Promise.all(
        db_c0.map((phrase) => prisma.phrase.create({ data: phrase }))
    )

    await Promise.all(
        db_c1.map((phrase) => prisma.phrase.create({ data: phrase }))
    )
  } catch (error) {
        console.error(error)
  }
}
