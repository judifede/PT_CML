import { saveHistory } from './history.controller.js'
import { getOnePhrase } from './phrase.controller.js'

export const handleGenerateText = async (req, res) => {
  const resultHistory = await saveHistory(req, res)
  if(resultHistory.result === 'Error') return res.status(500).json({ message: resultHistory.message, result: resultHistory.result })
  console.log(resultHistory)

  const resultPhrase = await getOnePhrase(req, res)
  if(resultPhrase.result === 'Error') return res.status(500).json({ message: resultPhrase.message, result: resultPhrase.result })

  console.log(resultPhrase)

  return res.status(200).json({ resultHistory, resultPhrase })
}
