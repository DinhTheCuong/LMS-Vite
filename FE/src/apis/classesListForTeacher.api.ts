import http from '@/utils/http'

export const getClassesListForTeacher = async () => http.get('/class/mentor/all')
