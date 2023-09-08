import http from '@/utils/http'

export const getUserListForAdmin = (role_user: string, page?: any, limit?: any) =>
  http.get('/user', {
    params: {
      role: role_user,
      page,
      limit,
    },
  })
