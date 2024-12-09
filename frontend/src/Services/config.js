
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_ENV === 'production'
  ? 'https://pt-generacion-texto-ia-backend.vercel.app/'
  : 'http://localhost:3000'

const api = axios.create({
  baseURL: BASE_URL
})

export default api