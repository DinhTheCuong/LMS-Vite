import http from '@/utils/http'

export const getClassesList = (page?: any, limit?: any) =>
  http.get('/class', {
    params: {
      page,
      limit,
    },
  })
