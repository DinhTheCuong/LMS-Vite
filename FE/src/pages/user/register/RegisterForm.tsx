import { Button, Checkbox, Form, Input, Select, DatePicker } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import handleRegister from '@/apis/register.api'

const { Option } = Select

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const [registerValue, setRegisterValue] = useState({
    fullname: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    phone_number: '',
    username: '',
    password: '',
  })

  return (
    <div className='mt-4'>
      <Form
        name='register'
        className='mt-4'
        initialValues={{ prefix: '84' }}
        scrollToFirstError
        layout='vertical'
      >
        <div className='grid grid-cols-2 gap-3'>
          {/* fullname */}
          <Form.Item
            name='fullname'
            rules={[{ required: true, message: 'Please input your fullname!', whitespace: true }]}
            hasFeedback
            label={<p className='my-2 font-bold'>Full Name</p>}
          >
            <Input
              size='large'
              type='text'
              placeholder='Full Name ...'
              maxLength={200}
              onChange={(e) => {
                setRegisterValue({ ...registerValue, fullname: e.target.value })
              }}
            />
          </Form.Item>

          {/* date of birth */}
          <Form.Item
            name='dob'
            label={<p className='my-2 font-bold'>Date of Birth</p>}
            rules={[{ required: true, message: 'Please input your date of birth!' }]}
            hasFeedback
          >
            <DatePicker
              size='large'
              className='w-full'
              format='DD/MM/YYYY'
              onChange={(_date: any, dateString: string) => {
                setRegisterValue({ ...registerValue, dob: dateString })
              }}
            />
          </Form.Item>

          {/* gender */}
          <Form.Item
            name='gender'
            rules={[{ required: true, message: 'Please select gender!' }]}
            label={<p className='my-2 font-bold'>Gender</p>}
            hasFeedback
          >
            <Select
              size='large'
              placeholder='Select your gender'
              onChange={(value) => {
                setRegisterValue({ ...registerValue, gender: value })
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
            label={<p className='my-2 font-bold'>Phone number</p>}
            hasFeedback
            rules={[
              { required: true, message: 'Please input your phone number!' },
              {
                validator(_, value) {
                  if (!value || value.length === 10) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Please enter 10 digit Number!'))
                },
              },
            ]}
          >
            <Input
              size='large'
              style={{ width: '100%' }}
              placeholder='Phone number ...'
              maxLength={10}
              type='number'
              onBlur={(e) => {
                setRegisterValue({ ...registerValue, phone_number: e.target.value })
              }}
            />
          </Form.Item>

          {/* address */}
          <Form.Item
            name='address'
            rules={[{ required: true, message: 'Please select your address!', whitespace: true }]}
            label={<p className='my-2 font-bold'>Address</p>}
            hasFeedback
          >
            <Input
              size='large'
              style={{ width: '100%' }}
              placeholder='Your address ...'
              maxLength={200}
              onChange={(e) => {
                setRegisterValue({ ...registerValue, address: e.target.value })
              }}
            />
          </Form.Item>

          {/* email */}
          <Form.Item
            name='email'
            label={<p className='my-2 font-bold'>Email</p>}
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
          >
            <Input
              size='large'
              placeholder='Email address here ...'
              maxLength={200}
              onChange={(e) => {
                setRegisterValue({ ...registerValue, email: e.target.value })
              }}
            />
          </Form.Item>
        </div>

        {/* username */}
        <Form.Item
          name='username'
          label={<p className='my-2 font-bold'>Username</p>}
          hasFeedback
          rules={[
            { required: true, message: 'Please input your username!', whitespace: true },
            {
              validator(_, value) {
                if (!value || value.length >= 6) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Please enter Username at least 6 characters'))
              },
            },
          ]}
        >
          <Input
            size='large'
            placeholder='Username ...'
            maxLength={200}
            onChange={(e) => {
              setRegisterValue({ ...registerValue, username: e.target.value })
            }}
          />
        </Form.Item>

        <div className='grid grid-cols-2 gap-3'>
          {/* password */}
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator(_, value) {
                  if (!value || value.length >= 6) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Please enter password at least 6 characters'))
                },
              },
            ]}
            hasFeedback
            label={<p className='my-2 font-bold'>Password</p>}
          >
            <Input.Password
              size='large'
              placeholder='********'
              minLength={6}
              onChange={(e) => {
                setRegisterValue({ ...registerValue, password: e.target.value })
              }}
            />
          </Form.Item>

          {/* confirm password */}
          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            label={<p className='my-2 font-bold'>Confirm Password</p>}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              size='large'
              placeholder='********'
              minLength={6}
            />
          </Form.Item>
        </div>

        {/* accept agreement */}
        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href='/'>Term & Conditions</a>
          </Checkbox>
        </Form.Item>

        {/* submit */}
        <Form.Item name='register'>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className='w-full'
            onClick={() => handleRegister(registerValue, navigate)}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterForm
