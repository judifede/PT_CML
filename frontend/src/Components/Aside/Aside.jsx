import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getHistory } from '../../Services/app.service'

function Aside({ refreshHistory }) {
  const [history, setHistory] = useState()
  const [historyStatus, setHistoryStatus] = useState('')

  const handleDates = (dateString) => {
    const date = new Date(dateString)

    const month = date.toLocaleString('es-ES', { month: 'short' })

    const returnDate =
      date.getDate() +
      ' ' +
      month.substring(0, 1).toUpperCase() +
      month.substring(1, month.length) +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes().toString().padStart(2, '0');

    return returnDate
  }

  useEffect(() => {
    //TODO: El historial cuando pulsas te muestra la frase que te mostró
    const handleGetHistory = async () => {
      try {
        const historyData = await getHistory()
        setHistoryStatus(historyData.result)
        if (historyData.result === 'Error') {
          //El historial está vacío
          setHistory(historyData.message)
        } else {
          setHistory(historyData.history)
        }
      } catch (err) {
        console.error(err)
      }
    }

    handleGetHistory()
  }, [refreshHistory])

  return (
    <aside className="flex flex-col lg:h-[100vh] lg:bg-white/90 bg-gray-100/90 p-10 relative">
      <header className="flex flex-col gap-2">
        <img src="/history.svg" alt="Logo Phrase AI" className="h-8" />

        <h2 className="mb-10 text-xl text-center">Historial</h2>
      </header>
      <section className="flex flex-col gap-3 max-h-[calc(100vh-040px)] overflow-y-auto">
        {history && historyStatus !== 'Error'
          ? history.map((item) => (
              <>
                <article key={item.id} className="hover:bg-gray-200 p-3">
                  <p className="">- {item.name}</p>
                  <p className="font-semibold text-xs flex justify-end">
                    {handleDates(item.createdAt)}
                  </p>
                </article>
              </>
            ))
          : history}
      </section>
    </aside>
  )
}

Aside.propTypes = {
  refreshHistory: PropTypes.number,
}

export default Aside
