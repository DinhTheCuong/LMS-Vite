import React, { useState } from 'react'
import { Divider, Button, Form, Input, Select, DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import viVN from 'antd/es/date-picker/locale/vi_VN'
import dayjs from 'dayjs'
import Header from '@/layouts/user/Header'
import Footer from '@/layouts/user/Footer'
import UploadImage from '@/components/upload/UploadImage'
import { useQueryString } from '@/utils/utils'
import { getUserProfile } from '@/apis/userProfile.api'
import handleUpdateUser from '@/apis/updateUser.api'
import 'dayjs/locale/vi'

const { Option } = Select

const EditProfile: React.FC = () => {
  const navigate = useNavigate()

  const queryString: { id?: string } = useQueryString()
  const id = String(queryString.id)

  const userData = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await getUserProfile(id)
      return data.data
    },
  }).data

  const [editProfileValue, setEditProfileValue] = useState({
    fullname: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    phone_number: '',
    avatar: '',
  })

  const [imageUpload, setImageUpload] = useState([])
  const USER = JSON.parse(localStorage.getItem('user') as string)

  return (
    <>
      <Header />
      <div
        className='max-w-[1280px] max-xl:w-[92%] mx-auto my-8 bg-white dark:bg-[#1E293B] dark:border-none rounded-lg border-[1px] border-solid border-gray-200 overflow-hidden'
        style={{ boxShadow: '0 0 10px rgba(0,0,0,.18)', cursor: 'pointer', border: '1px solid rgba(0,0,0,.1)' }}
      >
        <div className='px-12 pt-8'>
          <span className='text-xl font-bold text-gray-800 dark:text-gray-200'>Profile Detail</span>
          <p className='text-gray-600 dark:text-gray-300'>You have full control to manage your own account setting.</p>
        </div>
        <Divider
          style={{ margin: 0 }}
          className='dark:bg-gray-600'
        />
        <div className='px-12 pt-8'>
          <UploadImage
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
          />

          <Divider className='dark:bg-gray-600 m-0 mb-8' />

          <Form
            name='editProfile'
            className='mt-4'
            scrollToFirstError
            layout='vertical'
          >
            <div className='grid grid-cols-2 gap-3'>
              {/* fullname */}
              <Form.Item
                name='fullname'
                rules={[{ required: true, message: 'Please input your fullname!', whitespace: true }]}
                hasFeedback
                label={<p className='my-2 font-bold dark:text-gray-300'>Full Name</p>}
                initialValue={USER && USER.fullname}
              >
                <Input
                  name='fullname'
                  size='large'
                  type='text'
                  placeholder={userData && userData.fullname}
                  maxLength={100}
                  onChange={(e) => {
                    setEditProfileValue({ ...editProfileValue, fullname: e.target.value })
                  }}
                />
              </Form.Item>

              {/* date of birth */}
              <Form.Item
                name='dob'
                label={<p className='my-2 font-bold dark:text-gray-300'>Date of Birth</p>}
                rules={[{ required: true, message: 'Please input your date of birth!' }]}
                hasFeedback
                initialValue={dayjs(new Date(new Date()).toISOString(), 'YYYY-MM-DD')}
              >
                <DatePicker
                  name='dob'
                  size='large'
                  className='w-full'
                  locale={viVN}
                  format='DD/MM/YYYY'
                  placeholder={userData ? userData.dob : 'Select your date of birth?'}
                  onChange={(_date: any, dateString: string) => {
                    setEditProfileValue({ ...editProfileValue, dob: dateString })
                  }}
                />
              </Form.Item>

              {/* gender */}
              <Form.Item
                name='gender'
                rules={[{ required: true, message: 'Please select gender!' }]}
                label={<p className='my-2 font-bold dark:text-gray-300'>Gender</p>}
                hasFeedback
                initialValue={USER && USER.gender}
              >
                <Select
                  size='large'
                  placeholder={userData ? userData.gender : 'Select your gender?'}
                  onChange={(value) => {
                    setEditProfileValue({ ...editProfileValue, gender: value })
                  }}
                >
                  <Option value='male'>Male</Option>
                  <Option value='female'>Female</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>

              {/* phone number */}
              <Form.Item
                name='phone'
                label={<p className='my-2 font-bold dark:text-gray-300'>Phone number</p>}
                hasFeedback
                initialValue={USER && USER.phone_number}
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  {
                    validator(_, value) {
                      if (!value || value.length >= 10) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Please enter 10 digit Number!'))
                    },
                  },
                ]}
              >
                <Input
                  name='phone'
                  size='large'
                  style={{ width: '100%' }}
                  placeholder={userData ? userData.phone_number : 'Phone number ...'}
                  maxLength={10}
                  type='number'
                  onBlur={(e) => {
                    setEditProfileValue({ ...editProfileValue, phone_number: e.target.value })
                  }}
                />
              </Form.Item>

              {/* address */}
              <Form.Item
                name='address'
                rules={[{ required: true, message: 'Please select your address!', whitespace: true }]}
                label={<p className='my-2 font-bold dark:text-gray-300'>Address</p>}
                hasFeedback
                initialValue={USER && USER.address}
              >
                <Input
                  name='address'
                  size='large'
                  style={{ width: '100%' }}
                  placeholder={userData ? userData.address : 'Your address ...'}
                  maxLength={200}
                  onChange={(e) => {
                    setEditProfileValue({ ...editProfileValue, address: e.target.value })
                  }}
                />
              </Form.Item>

              {/* email */}
              <Form.Item
                name='email'
                label={<p className='my-2 font-bold dark:text-gray-300'>Email</p>}
                hasFeedback
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid Email!',
                  },
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
                initialValue={USER && USER.email}
              >
                <Input
                  name='email'
                  size='large'
                  placeholder={userData ? userData.email : 'Email address here ...'}
                  maxLength={200}
                  onChange={(e) => {
                    setEditProfileValue({ ...editProfileValue, email: e.target.value })
                  }}
                />
              </Form.Item>

              <div className='grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-md:grid-cols-2'>
                {/* submit */}
                <Form.Item name='update'>
                  <Button
                    size='large'
                    htmlType='submit'
                    className='w-full'
                    type='primary'
                    onClick={() => {
                      handleUpdateUser(editProfileValue, imageUpload, navigate)
                    }}
                  >
                    Update
                  </Button>
                </Form.Item>
                {/* submit */}
                <Form.Item name='cancel'>
                  <Button
                    type='primary'
                    size='large'
                    className='w-full'
                    danger
                    onClick={() => {
                      navigate('/', {
                        replace: true,
                      })
                    }}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default EditProfile
