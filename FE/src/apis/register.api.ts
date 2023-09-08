import http from '@/utils/http'

const handleRegister = async (
  value: {
    fullname: string
    email: string
    dob: string
    gender: string
    address: string
    phone_number: string
    username: string
    password: string
  },
  other?: any,
) => {
  await http
    .post('/auth/sign-up', JSON.stringify(value))
    .then((res) => {
      if (res.status === 200) {
        other('/login', { replace: true })
        other(0)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export default handleRegister
