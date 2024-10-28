import { useState } from 'react'
import './App.css'
import Aside from './Components/Aside/Aside'
import Main from './Components/Main/Main'

function App() {
  const [refreshHistory, setRefreshHistory] = useState(0)

  return (
    <>
      <Aside refreshHistory={refreshHistory}></Aside>
      <Main setRefreshHistory={setRefreshHistory} refreshHistory={refreshHistory}></Main>
    </>
  )
}

export default App
