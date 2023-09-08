import http from '@/utils/http'

export const getSessionById = async (id: string) => http.get(`/session/${id}`)
