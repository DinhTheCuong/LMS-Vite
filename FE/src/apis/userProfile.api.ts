import http from '@/utils/http'

export const getUserProfile = async (id: string) => {
  const TOKEN = JSON.parse(localStorage.getItem('login') as string).accessToken
  return http.get(`/user/info/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
}
