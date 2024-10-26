import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getHistory } from '../../Services/app.service'

function Aside({ refreshHistory }) {
  const [history, setHistory] = useState()
  const [historyStatus, setHistoryStatus] = useState('')

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    //TODO: borrar logs
    // console.log(date.toLocaleString("es-ES"))
    // console.log(date.toLocaleDateString("es-ES") + " " + date.toLocaleTimeString("es-ES"))
    return date.toLocaleString('es-ES')
  }

  useEffect(() => {
    //TODO: El historial cuando pulsas te muestra la frase que te mostró
    //TODO: No repetir Año - Mes, etc
    const handleGetHistory = async () => {
      try {
        const historyData = await getHistory()
        console.log(historyData)
        setHistoryStatus(historyData.result)
        if (historyData.result === 'Error') {
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
    <aside className="flex flex-col h-[100vh] bg-white/90 p-10 gap-20 relative">
      <header className='flex flex-col gap-2'>
        <img src="/history.svg" alt="Logo Phrase AI" className="h-8" />

        <h2 className="mb-10 text-xl text-center">Historial</h2>
      </header>
      <section className="flex flex-col gap-3 max-h-[calc(100vh-240px)] overflow-y-auto absolute top-32">
        {history && historyStatus !== 'Error'
          ? history.map((item) => (
              <article key={item.id} className="hover:bg-gray-200 p-3">
                <p className="font-semibold text-sm">{formatDate(item.createdAt)}</p>
                <p>- {item.name}</p>
              </article>
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
