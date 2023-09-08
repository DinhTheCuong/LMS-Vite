import http from '@/utils/http'

export const getFeedback = (page: string, limit: string) =>
  http.get('/feedback', {
    params: {
      page,
      limit,
    },
  })
