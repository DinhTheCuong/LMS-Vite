import http from '@/utils/http'

export const getCourseByCourseCode = async (course_code: string) =>
  http.get('/course', {
    params: { search: course_code },
  })
