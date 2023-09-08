import http from '@/utils/http'

export const addStudentToClass = async (addedData: any) => http.post('/class/add-student', addedData)
