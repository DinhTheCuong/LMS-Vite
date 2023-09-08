import http from '@/utils/http'

export const getLessonsList = (course_id?: string, page?: any, limit?: any) => {
  return http.get('/lesson', {
    params: {
      course_id,
      page,
      limit,
    },
  })
}
