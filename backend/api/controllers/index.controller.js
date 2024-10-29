import { saveHistory } from './history.controller.js'
import { getOnePhrase } from './phrase.controller.js'

export const handleGenerateText = async (req, res) => {
  const resultPhrase = await getOnePhrase(req, res)

  const resultHistory = await saveHistory(req, res, resultPhrase)
  if (resultHistory.result === 'Error' || resultPhrase.result === 'Error')
    return res
      .status(500)
      .json({ resultHistory, resultPhrase, })


  return res.status(200).json({ resultHistory, resultPhrase })
}
