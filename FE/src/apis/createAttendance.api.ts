import http from '@/utils/http'

export const createAttdendance = async (class_id: string, session_id?: string, page?: string, limit?: string) =>
  http.get('/attendance', { params: { class_id, page, limit } }).then().catch()
