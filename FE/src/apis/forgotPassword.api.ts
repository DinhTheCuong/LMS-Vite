import http from '@/utils/http'

const handleForgotPassword = async (email: string, other?: any) => {
  await http
    .post('/auth/forgot-password', { email })
    .then((res) => {
      console.log(res)
      if (email.length !== 0 && res.status === 200) {
        other('/forgot-password/send-mail')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export default handleForgotPassword
