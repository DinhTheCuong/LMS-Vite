import React, { useState } from 'react'
import { Button, Form, Input, Select, DatePicker } from 'antd'
import { Option } from 'antd/es/mentions'
import '../../../user/profile/Profile/Profile.css'
import Image from './Image.tsx'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const Profile: React.FC = () => {
  // const [userName] = useState('Nam')
  return (
    <div className='profile-container'>
      <div
        style={{
          width: '50%',
          padding: '10px',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
          <h1>Edit Profile</h1>
          <Image />
        </div>
        <Form
          name='basic'
          layout='vertical'
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <div className='Form-profile'>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
              <Form.Item
                label='User Name'
                name='username'
                //   rules={[{ required: true, message: 'Please input your user name!' }]}
              >
                <Input
                  disabled
                  width={200}
                />
              </Form.Item>

              <Form.Item
                label='Id'
                name='id'
                //   rules={[{ required: true, message: 'Please input your user name!' }]}
              >
                <Input disabled />
              </Form.Item>
            </div>

            <Form.Item
              label='Full Name'
              name='fullname'
              //   rules={[{ required: true, message: 'Please input your user name!' }]}
            >
              <Input style={{ width: '450px' }} />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              //   rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input style={{ width: '450px' }} />
            </Form.Item>

            <Form.Item
              label='Phone Number'
              name='phonenumber'
              //   rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input style={{ width: '450px' }} />
            </Form.Item>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '25px' }}>
              <Form.Item
                label='Birthday'
                name='birthday'
              >
                <DatePicker style={{ width: '210px' }} />
              </Form.Item>

              <Form.Item
                label='Gender'
                name='gender'
                // rules={[{ required: true, message: 'Please select your gender!' }]}
              >
                <Select style={{ width: '210px' }}>
                  <Option value='Male' />
                  <Option value='Female' />
                  <Option value='Other' />
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              label='Address'
              name='address'
              //   rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input style={{ width: '450px' }} />
            </Form.Item>
          </div>

          <div className='btn-changePassword'>
            <Form.Item>
              <Button htmlType='button'>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
              >
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Profile
