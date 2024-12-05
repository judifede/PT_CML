import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function exportData() {
  // Obtén todos los registros de cada modelo
  const phrases = await prisma.phrase.findMany()
  const histories = await prisma.history.findMany()

  // Genera el script SQL
  let sqlScript = ''

  // Genera inserts para la tabla phrase
  phrases.forEach(phrase => {
    sqlScript += `INSERT INTO phrase (id, name, author, creativity) VALUES (${phrase.id}, "${phrase.name}", "${phrase.author}", ${phrase.creativity});\n`
  })

  // Genera inserts para la tabla history
  histories.forEach(history => {
    sqlScript += `INSERT INTO history (id, name, createdAt, errorMessage, phraseId) VALUES (${history.id}, "${history.name}", "${history.createdAt}", "${history.errorMessage}", ${history.phraseId});\n`
  })

  // Guarda el script SQL en un archivo
  fs.writeFileSync('prisma/backup.sql', sqlScript)
  console.log('Datos exportados a backup.sql')
}

exportData()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })