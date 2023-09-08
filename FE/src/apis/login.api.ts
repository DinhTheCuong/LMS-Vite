import { message } from 'antd'
import http from '@/utils/http'
import { getUserProfile } from './userProfile.api'

const handleLogin = async (value: { username: string; password: string }, others?: any) => {
  await http
    .post('/auth/sign-in', JSON.stringify(value))
    .then((res) => {
      if (res && res.data.id) {
        const loginData = {
          userId: res.data.id,
          username: res.data.username,
          role: res.data.role,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }
        localStorage.setItem('login', JSON.stringify(loginData))

        getUserProfile(res.data.id)
          .then((res) => {
            const userData = res.data.data
            const userInfo = {
              id: userData._id,
              fullname: userData.fullname,
              email: userData.email,
              phone_number: userData.phone_number,
              username: userData.username,
              role: userData.role,
              dob: userData.dob,
              gender: userData.gender,
              address: userData.address,
              avatar: userData.avatar,
            }
            localStorage.setItem('user', JSON.stringify(userInfo))

            others('/', {
              replace: true,
            })
            others(0)
          })
          .catch((error) => {
            console.log(error)
            message.error('Something went wrong!')
          })
      }

      if (res && res.data.statusCode === 404) {
        message.error('Wrong Email or Password. Please try again!')
      }
    })
    .catch(() => {
      message.error('Wrong Email or Password. Please try again!')
    })
}

export default handleLogin
