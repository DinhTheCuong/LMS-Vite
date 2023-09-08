import http from '@/utils/http'

export const handleGetCoursesByRate = (rate: any) => {
  return http.get('/course', { params: { rate } })
}
