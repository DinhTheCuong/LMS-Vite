import http from '@/utils/http'

export const getCourse = async (id?: string) => http.get(`/course/${id}`)
