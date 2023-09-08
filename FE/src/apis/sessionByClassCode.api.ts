import http from '@/utils/http'

export const getSessionsByClassCode = async (class_id?: string, page?: string, limit?: string) =>
  http.get('/session', {
    params: {
      class_id,
      page,
      limit,
    },
  })
