import { saveHistory } from "./history.controller.js";
import { getOnePhrase } from "./phrase.controller.js";

export const handleGenerateText = async (req, res) => {
  const resultHistory = await saveHistory(req, res)

  const resultPhrase = await getOnePhrase(req, res)

  return res.status(200).json({resultHistory, resultPhrase})
}
