import axios, { AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Function to refresh the access token using the refresh token
async function refreshAccessToken(): Promise<string> {
  const user = JSON.parse(localStorage.getItem('login') as string)
  // console.log(user.refreshToken)
  const response = await http.post(`/auth/refresh`, { refreshToken: user.refreshToken })
  // console.log(response)
  const { accessToken } = response.data
  // console.log(response.data)
  return accessToken
}

http.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('login') as string)
    if (user) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${user.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const accessToken = await refreshAccessToken()
      const user = JSON.parse(localStorage.getItem('login') as string)
      user.accessToken = accessToken
      localStorage.setItem('login', JSON.stringify(user))
      http.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return http(originalRequest)
    }
    if (error.response.status === 403 && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  },
)

export default http
