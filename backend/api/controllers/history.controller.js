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

export const saveHistory = async (req, res) => {
  try {
    if (req.body.prompt === undefined) {
      return { message: 'No se ha enviado la búsqueda ', result: 'Error' }
    }

    await prisma.history.create({
      data: {
        name: req.body.prompt,
      },
    })

    return { result: 'OK' }
  } catch (err) {
    console.error(err)
  }
}
