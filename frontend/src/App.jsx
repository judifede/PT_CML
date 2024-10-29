import { useState } from 'react'
import './App.css'
import Aside from './Components/Aside/Aside'
import Main from './Components/Main/Main'

function App() {
  const [refreshHistory, setRefreshHistory] = useState(0)
  const [refreshChosenHistory, setRefreshChosenHistory] = useState(0)
  const [chosenHistory, setChosenHistory] = useState()

  return (
    <>
      <Aside
        refreshHistory={refreshHistory}
        setRefreshChosenHistory={setRefreshChosenHistory}
        setChosenHistory={setChosenHistory}
      ></Aside>
      <Main
        setRefreshHistory={setRefreshHistory}
        refreshHistory={refreshHistory}
        refreshChosenHistory={refreshChosenHistory}
        chosenHistory={chosenHistory}
      ></Main>
    </>
  )
}

export default App
