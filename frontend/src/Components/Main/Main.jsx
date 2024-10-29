import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { generateText } from '../../Services/app.service'

import { Tooltip } from 'flowbite-react'
import PhraseResponse from '../PhraseResponse/PhraseResponse'
import { calcTextResponseLength } from '../../utils'

function Main({
  setRefreshHistory,
  refreshHistory,
  refreshChosenHistory,
  chosenHistory,
}) {
  const [currentSearch, setCurrentSearch] = useState('')
  const [textResponse, setTextResponse] = useState({})
  const [textStatus, setTextStatus] = useState('')
  const [phraseResponseLength, setPhraseResponseLength] = useState(0)

  useEffect(() => {
    if (refreshChosenHistory > 0) {
      setTextResponse({
        name: chosenHistory.name,
        author: chosenHistory.author,
        error: chosenHistory.errorMessage,
      })
      setCurrentSearch(chosenHistory.search)
      setTextStatus(chosenHistory.errorMessage ? 'Error' : 'OK')
      setPhraseResponseLength(chosenHistory.textResponseLength)
    }
  }, [refreshChosenHistory, chosenHistory])

  const handleSearch = async (event) => {
    try {
      event.preventDefault()

      const fields = new window.FormData(event.target)
      const search = fields.get('search')
      const creativity = fields.get('creativity') === null ? 0 : 1
      const maxLength = fields.get('maxLength')

      const bodyObj = {
        prompt: search.trim(),
        maxLength: maxLength,
        creativity: creativity,
      }
      const textData = await generateText(bodyObj)

      setTextStatus(
        textData.resultPhrase.result
          ? textData.resultPhrase.result
          : textData.resultHistory.result
      )

      const textResponseLength = calcTextResponseLength(
        textData.resultPhrase.phrase.name,
        textData.resultPhrase.phrase.author
      )

      setPhraseResponseLength(textResponseLength)

      if (textData.resultPhrase.result === 'Error') {
        setTextResponse((TextResponse) => ({
          ...TextResponse,
          name: textData.resultPhrase.phrase.name,
          author: textData.resultPhrase.phrase.author,
          error: textData.resultPhrase.message,
        }))
      } else {
        setTextResponse((TextResponse) => ({
          ...TextResponse,
          name: textData.resultPhrase.phrase.name,
          author: textData.resultPhrase.phrase.author,
        }))
      }

      setCurrentSearch(search)
      setRefreshHistory((value) => value + 1)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="p-5">
      <header className="flex gap-2">
        <h1 className="text-4xl font-serif">Phrase AI</h1>
      </header>
      <div className="lg:h-[55vh] h-[40vh] flex flex-col gap-5 justify-center items-center">
        <form
          onSubmit={(event) => {
            handleSearch(event)
          }}
          className="flex flex-col gap-5 justify-center items-center"
        >
          <h2 className="md:text-3xl text-xl">
            ¿Sobre qué palabra quieres una frase?
          </h2>
          <div className="flex gap-5 items-center">
            <input
              type="search"
              name="search"
              id="search"
              className="md:w-96 w-60 h-8 p-5 rounded-2xl bg-gray-200 border border-black/30"
              placeholder='vida'
              autoFocus
            />
          </div>
          <button className="hidden">Enviar</button>
          <div className="flex gap-5">
            <label
              htmlFor="creativity"
              className="inline-flex items-center cursor-pointer"
            >
              <span className="mr-3 text-sm font-medium text-gray-900">
                Modo creativo
              </span>
              <Tooltip content="Habilita frases más creativas">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  name="creativity"
                  id="creativity"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-400"></div>
              </Tooltip>
            </label>
            <label htmlFor="maxLength">
              <span className="mr-3 text-sm font-medium text-gray-900">
                Límite de Frase
              </span>
              <input
                type="number"
                max={1000}
                min={10}
                defaultValue={100}
                className="w-20 rounded-lg px-3 py-2 bg-gray-200"
                name="maxLength"
                id="maxLength"
              />
            </label>
          </div>
        </form>
      </div>
      <footer className="flex flex-col w-[560px] m-auto">
        <PhraseResponse
          key={refreshHistory + refreshChosenHistory} //Al cambiar la key se recarga el componente, habilitando su animación
          textResponse={textResponse}
          textStatus={textStatus}
          phraseResponseLength={phraseResponseLength}
          currentSearch={currentSearch}
        ></PhraseResponse>
      </footer>
    </main>
  )
}

Main.propTypes = {
  setRefreshHistory: PropTypes.func,
  refreshHistory: PropTypes.number,
  refreshChosenHistory: PropTypes.number,
  chosenHistory: PropTypes.object,
}

export default Main
