import { message } from 'antd'
import http from '@/utils/http'

export const handleSubmitAttendance = async (list?: any, navigate?: any) =>
  http
    .post('/attendance', { list })
    .then(() => {
      message.success('Done!')
      setTimeout(() => {
        navigate('/teacher/classes-list?page=1&limit=10')
      }, 1200)
    })
    .catch(() => {
      message.error('Error!')
    })
