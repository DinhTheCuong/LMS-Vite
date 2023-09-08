import http from '@/utils/http'

export const getStudentsByClassID = (class_id: string) =>
  http.get('/user', {
    params: {
      class_id,
    },
  })
