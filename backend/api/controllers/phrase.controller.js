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

export const getPhrase = async ({ creativity, chosenWord, maxLength }) => {
  const likeChosenWord = '%' + chosenWord + '%'

  const phrase = await prisma.$queryRaw`
    SELECT * FROM Phrase
    WHERE creativity = ${creativity}
    AND name LIKE ${likeChosenWord}    
    AND length(name) <= ${maxLength}
    ORDER BY RANDOM()
    LIMIT 1;
  `

  return phrase.length > 0 ? phrase[0] : null
}

export const getOnePhrase = async (req, res) => {
  try {
    const creativity = req.body.creativity
    const maxLength = req.body.maxLength

    //Elegimos la palabra más larga
    const chosenWord = req.body.prompt
      .split(' ')
      .reduce((prev, current) =>
        prev.length > current.length ? prev : current
      )

    if (creativity === undefined) {
      return { message: 'No se han enviado todos los datos', result: 'Error' }
    }

    let phrase = await getPhrase({ creativity, chosenWord, maxLength })

    if (phrase === null || phrase === undefined || phrase.length === 0) {
      phrase = await getRandomPhrase(creativity)
      return {
        phrase,
        message: 'No he encontrado una frase con esa palabra',
        result: 'Error',
      }
    }

    if (maxLength < phrase.name.length) {
      phrase = await getRandomPhrase(creativity)
      return {
        phrase,
        message: 'No he encontrado una frase con ese límite',
        result: 'Error',
      }
    }

    return { phrase, result: 'OK' }
  } catch (err) {
    console.error(err)
  }
}
