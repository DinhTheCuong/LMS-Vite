import axios from 'axios'
import { message } from 'antd'
import http from '@/utils/http'
import { getUserProfile } from './userProfile.api'

const handleUpdateUser = async (
  value: {
    fullname?: string
    email?: string
    dob?: string
    gender?: string
    address?: string
    phone_number?: string
    avatar?: string
  },
  imageUpload?: any,
  other?: any,
) => {
  const USER = JSON.parse(localStorage.getItem('user') as string)

  if (imageUpload.length > 0) {
    await axios
      .post('http://localhost:8080/api/v1/upload', imageUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const imageURl = res.data.data[0]
        const valueWithImage = {
          fullname: value.fullname ? value.fullname : USER.fullname,
          email: value.email ? value.email : USER.email,
          dob: value.dob ? value.dob : USER.dob,
          gender: value.gender ? value.gender : USER.gender,
          address: value.address ? value.address : USER.address,
          phone_number: value.phone_number ? value.phone_number : USER.phone_number,
          avatar: String(imageURl),
        }

        http
          .put(`/user`, JSON.stringify(valueWithImage))
          .then((res) => {
            console.log(res)
            if (res.status === 200) {
              getUserProfile(USER.id).then((res) => {
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

                other(`/edit-profile?id=${USER.id}`, { replace: true })
                other(0)
              })
            }
          })
          .catch(() => {
            message.error('Something went wrong!')
          })
      })
  } else {
    const updateValue = {
      fullname: value.fullname ? value.fullname : USER.fullname,
      email: value.email ? value.email : USER.email,
      dob: value.dob ? value.dob : USER.dob,
      gender: value.gender ? value.gender : USER.gender,
      address: value.address ? value.address : USER.address,
      phone_number: value.phone_number ? value.phone_number : USER.phone_number,
    }
    http
      .put(`/user`, JSON.stringify(updateValue))
      .then((res) => {
        if (res.status === 200) {
          getUserProfile(USER.id).then((res) => {
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

            other(`/edit-profile?id=${USER.id}`, { replace: true })
            other(0)
          })
        }
      })
      .catch(() => {
        message.error('Something went wrong!')
      })
  }
}

export default handleUpdateUser
