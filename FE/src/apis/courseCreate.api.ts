import http from '@/utils/http'

export const createCourse = async (courseData: any) => http.post('/course', courseData)
