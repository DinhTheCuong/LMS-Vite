import http from '@/utils/http'

export const registerCourseForAdmin = async (registerCourseData: any) =>
  http.post('/regist-course/admin', registerCourseData)

export const registerCourseForStudent = async (registerCourseData: any) =>
  http.post('/regist-course/student', registerCourseData)

export const getRegisterCourseList = async (workplace_id?: string, course_id?: string, page?: any, limit?: any) =>
  http.get('/regist-course', {
    params: {
      workplace_id,
      course_id,
      page,
      limit,
    },
  })
