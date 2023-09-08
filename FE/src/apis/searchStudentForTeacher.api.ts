import http from '@/utils/http'

export const searchStudentForTeacher = async (fullname?: string, username?: string, email?: string) =>
  http.get('/user', {
    params: { search: fullname || username || email },
  })
