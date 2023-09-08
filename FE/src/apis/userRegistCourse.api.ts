import http from '@/utils/http'
import { message } from 'antd'

export const handleUserRegistCourse = (course_id?: string, workplace_id?: string, other?: any) => {
  const payload = {
    course_id,
    workplace_id,
  }
  http
    .post('/regist-course/student', JSON.stringify(payload))
    .then(() => {
      message.success('Success!')
      setTimeout(() => {
        other('/')
      }, 1200)
    })
    .catch((err) => {
      if (err.statusCode === 403) {
        message.error(err.message)
      } else {
        message.error('Something went wrong!')
      }
    })
}
