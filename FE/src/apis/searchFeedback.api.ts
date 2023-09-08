import http from '@/utils/http'

export const searchFeedback = async (content?: string) =>
  http.get('/feedback', {
    params: { search: content },
  })
