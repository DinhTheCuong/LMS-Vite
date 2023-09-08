import http from '@/utils/http'

export const updateCourse = async (id: string) =>
  http.put('/course', {
    params: {
      id,
    },
  })
