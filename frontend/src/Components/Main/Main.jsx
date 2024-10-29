import { useState } from 'react'
import PropTypes from 'prop-types'
import { generateText } from '../../Services/app.service'

import { Tooltip } from 'flowbite-react'
import PhraseResponse from '../PhraseResponse/PhraseResponse'

function Main({ setRefreshHistory, refreshHistory }) {
  const [currentSearch, setCurrentSearch] = useState('')
  const [textResponse, setTextResponse] = useState({})
  const [textStatus, setTextStatus] = useState('')
  const [phraseResponseLength, setPhraseResponseLength] = useState(0)

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
        textData.result ? textData.result : textData.resultPhrase.result
      )

      const calcTextResponseLength =
        textData.resultPhrase.phrase.author.length +
        textData.resultPhrase.phrase.name.length +
        3

      setPhraseResponseLength(calcTextResponseLength)

      if (textData.result === 'Error') {
        setTextResponse((TextResponse) => ({
          ...TextResponse,
          name: textData.resultPhrase.phrase.name,
          author: textData.resultPhrase.phrase.author,
          error: textData.message,
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
        <h1 className="text-4xl font-serif tracking-wider">Phrase AI</h1>
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
          <div className="flex gap-5">
            <input
              type="search"
              name="search"
              id="search"
              className="md:w-96 w-60 h-8 p-5 rounded-2xl bg-gray-200 border border-black/30"
              autoFocus
            />
          </div>
          <div className="flex gap-5">
            <label
              htmlFor="creativity"
              className="inline-flex items-center cursor-pointer"
            >
              <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Modo creativo
              </span>
              <Tooltip content="Habilita frases más creativas">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  name="creativity"
                  id="creativity"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </Tooltip>
            </label>
            <label htmlFor="maxLength">
              <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Límite de Frase
              </span>
              <input
                type="number"
                max={1000}
                min={10}
                defaultValue={100}
                className="w-20 rounded-lg px-3 py-2 bg-gray-100"
                name="maxLength"
                id="maxLength"
              />
            </label>
          </div>
        </form>
      </div>
      <footer className="flex flex-col w-[560px] m-auto">
        <PhraseResponse
          key={refreshHistory} //Al cambiar la key se recarga el componente, habilitando su animación
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
}

export default Main
