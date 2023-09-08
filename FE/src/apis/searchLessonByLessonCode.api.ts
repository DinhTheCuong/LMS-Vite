import http from '@/utils/http'

export const getLessonByLessonCode = async (lesson_code: string) =>
  http.get(`/lesson`, { params: { search: lesson_code } })
