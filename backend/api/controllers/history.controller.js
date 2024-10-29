import { prisma } from '../db/index.db.js'

export const getHistory = async (req, res) => {
  try {
    const history = await prisma.history.findMany({
      take: 30,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })

    if (history.length === 0) {
      return res
        .status(503)
        .json({ message: 'El historial está vacío', result: 'Error' })
    }

    return res.status(200).json({ history, result: 'OK' })
  } catch (err) {
    console.error(err)
  }
}

export const getHistoryById = async (req, res) => {
  try {
    const history = await prisma.history.findFirst({
      where: {
        id: parseInt(req.params.id),
        phraseId: parseInt(req.params.phraseId),
      },
      include: { phrase: true },
    })

    if (history.length === 0) {
      return res.status(503).json({
        message: 'No existe un historial con esa frase',
        result: 'Error',
      })
    }

    return res.status(200).json({ history, result: 'OK' })
  } catch (err) {
    console.error(err)
  }
}

export const saveHistory = async (req, res, resultPhrase) => {
  try {
    if (req.body.prompt === undefined) {
      return { message: 'No se ha enviado la búsqueda ', result: 'Error' }
    }

    await prisma.history.create({
      data: {
        name: req.body.prompt,
        errorMessage: resultPhrase.result === 'Error' ? resultPhrase.message : '',
        phrase: {
          connect: {
            id: resultPhrase.phrase.id,
          },
        },
      },
    })

    return { result: 'OK', message: "Se ha guardado en el historial" }
  } catch (err) {
    console.error(err)
  }
}
