import { PrismaClient } from '@prisma/client'
import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const adapter = new PrismaLibSQL(libsql)

export const prisma = new PrismaClient({ adapter })

import phrases_creativity_0 from './phrases_creativity_0.json' with { type: 'json' }
import phrases_creativity_1 from './phrases_creativity_1.json' with { type: 'json' }

export const resetPhrase = async () => {
  try {
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Phrase'`

    await Promise.all(
      phrases_creativity_0.map((phrase) => {
        prisma.phrase.upsert({
          where: {
            name: phrase.name,
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
          },
        })
      })
    )

    await Promise.all(
      phrases_creativity_1.map((phrase) => {
        prisma.phrase.upsert({
          where: {
            name: phrase.name,
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
          },
        })
      })
    )
  } catch (err) {
    console.error(err)
  }
}
