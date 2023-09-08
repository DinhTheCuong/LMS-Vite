import http from '@/utils/http'

export const handleGetCoursesByLevel = (level: any) => {
  return http.get('/course', { params: { level } })
}
