import { prisma } from '../db/index.db.js'

/* 
Devuelve una frase aleatoria de uno de los tipos de creativity
creativity -> Tabla creativity puede ser 1 o 0
*/
const getRandomPhrase = async (creativity) => {
  const randomPhrase = await prisma.$queryRaw`
        SELECT * FROM Phrase
        where creativity = ${creativity}
        ORDER BY RANDOM()
        LIMIT 1
    `

  return randomPhrase[0]
}

export const testPhrase = async () => {
  const randomPhrase = await prisma.$queryRaw`
          SELECT length(name) FROM Phrase
          ORDER BY length(name) ASC
      `

  return randomPhrase[0]
}

export const getOnePhrase = async (req, res) => {
  try {
    const creativity = req.body.creativity
    const maxLength = req.body.maxLength

    const chosenWord = req.body.prompt.split(" ").reduce((prev, current)=> (
        prev.length > current.length ? prev : current
    ))

    if (creativity === undefined) {
      return { message: 'No se han enviado todos los datos', result: 'Error' }
    }

    // const randomSkip = Math.floor(Math.random() * 3)

    let phrase = await prisma.phrase.findFirst({
      where: {
        creativity: creativity,
        name: { contains: chosenWord },
      },
    //   skip: randomSkip,
    })

    if (phrase === null || maxLength < phrase.name.length) {
      phrase = await getRandomPhrase(creativity)
      return { phrase, message: 'No hemos encontrado una frase', result: 'maxLength' }
    }

    return { phrase, result: 'OK' }
  } catch (err) {
    console.error(err)
  }
}
