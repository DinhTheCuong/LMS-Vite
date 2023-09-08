import http from '@/utils/http'

export const getClassById = async (id: string) => http.get(`/class/${id}`)
