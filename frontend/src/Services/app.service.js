import api from './config'

export const generateText = async (bodyObj) => {
  try {
    const { data } = await api.post('/generate-text', bodyObj, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return data
  } catch (err) {
    if(err.message === 'Network Error'){
      console.log("Sin acceso al servidor")
    }
    if(err.response.data.resultPhrase.result === 'Error'){
      return err.response.data
    }
  }
}

export const getHistory = async () => {
  try {
    const { data } = await api.get('/history')
    return data
  } catch (err) {
    if(err.message === 'Network Error'){
      console.log("Sin acceso al servidor")
      return
    }
    if(err.response.data.result === 'Error'){
      return err.response.data
    }
  }
}

export const getHistoryById = async ({id, phraseId}) => {
  try {
    const { data } = await api.get(`/history/${id}/${phraseId}`)
    return data
  } catch (err) {
    if(err.message === 'Network Error'){
      console.log("Sin acceso al servidor")
      return

    }
    if(err.response.data.result === 'Error'){
      return err.response.data
    }
  }
}
