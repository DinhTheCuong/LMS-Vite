import http from '@/utils/http'

export const searchWorkplaceForAdmin = (status?: string, page?: string, limit?: string) =>
  http.get('/workplace', {
    params: {
      status,
      page,
      limit,
    },
  })
