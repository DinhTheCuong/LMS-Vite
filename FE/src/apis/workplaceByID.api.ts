import http from '@/utils/http'

export const getWorkplace = async (id: string) => http.get(`/workplace/${id}`)
