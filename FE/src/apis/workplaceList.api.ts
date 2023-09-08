import http from '@/utils/http'

export const getWorkplacesList = async (page?: any, limit?: any) =>
  http.get('/workplace', {
    params: {
      page,
      limit,
    },
  })
