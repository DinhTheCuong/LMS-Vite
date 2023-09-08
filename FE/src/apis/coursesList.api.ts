import http from '@/utils/http'

export const getCoursesList = (page?: any, limit?: any) =>
  http.get('/course', {
    params: {
      page,
      limit,
    },
  })
