import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

import phrases_creativity_0 from './phrases_creativity_0.json' assert { type: 'json' }
import phrases_creativity_1 from './phrases_creativity_1.json' assert { type: 'json' }

export const resetPhrase = async () => {
  try {
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Phrase'`

    await Promise.all(
      phrases_creativity_0.map((phrase) =>
        prisma.phrase.upsert({ 
          where: {
            name: phrase.name
          },
          create: {
            name: phrase.name,
            author: phrase.author,
            creativity: phrase.creativity,
          },
          update: {
            name: phrase.name,
            author: phrase.author,
            creativity: phrase.creativity,
          }
        })
      )
    )

    await Promise.all(
      phrases_creativity_1.map((phrase) =>
        prisma.phrase.upsert({ 
          where: {
            name: phrase.name
          },
          create: {
            name: phrase.name,
            author: phrase.author,
            creativity: phrase.creativity,
          },
          update: {
            name: phrase.name,
            author: phrase.author,
            creativity: phrase.creativity,
          }
        })
      )
    )
  } catch (err) {
    console.error(err)
  }
}
