import http from '@/utils/http'

export const getSessionBySessionCode = async (session_code: string) =>
  http.get('/session', {
    params: { search: session_code },
  })
