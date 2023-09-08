import axios from 'axios'

export const uploadImage = async (imageUpload: any) =>
  axios.post('http://localhost:8080/api/v1/upload', imageUpload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
