import http from '@/utils/http'

export const createClass = async (classData: any) => http.post('/class', classData)
