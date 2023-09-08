import http from '@/utils/http'

export const createWorkplace = async (workplaceData: any) => http.post('/workplace', workplaceData)
