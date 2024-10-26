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
    if(err.response.data.result === 'Error'){
      return err.response.data
    }
  }
}

export const getHistory = async () => {
  try {
    const { data } = await api.get('/history')
    return data
  } catch (err) {
    if(err.response.data.result === 'Error'){
      return err.response.data
    }
  }
}
