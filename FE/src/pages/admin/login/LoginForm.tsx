import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import handleLogin from '@/apis/login.api'

const LoginForm = () => {
  const navigate = useNavigate()
  const [loginValue, setLoginValue] = useState({ username: '', password: '' })

  return (
    <div className='mt-4'>
      <Form
        name='normal_login'
        className='w-full'
        initialValues={{ remember: true }}
        layout='vertical'
      >
        <Form.Item
          name='username'
          label={<p className='font-bold my-2'>Username</p>}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input your Usename!',
            },
          ]}
        >
          <Input
            size='large'
            placeholder='Username address here ...'
            onChange={(e) => {
              setLoginValue({ ...loginValue, username: e.target.value })
            }}
          />
        </Form.Item>

        <Form.Item
          name='password'
          label={<p className='font-bold my-2 text-black'>Password</p>}
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
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('Please enter password at least 6 characters')
              },
            },
          ]}
          hasFeedback
        >
          <Input.Password
            size='large'
            type='password'
            placeholder='********'
            onChange={(e) => {
              setLoginValue({ ...loginValue, password: e.target.value })
            }}
          />
        </Form.Item>

        <Form.Item>
          <Form.Item
            name='remember'
            valuePropName='checked'
            noStyle
          >
            <Checkbox>
              <span className='text-black'>Remember me</span>
            </Checkbox>
          </Form.Item>

          <Link
            className='float-right'
            to='/forgot-password'
          >
            Forgot password?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            className='w-full'
            onClick={() => handleLogin(loginValue, navigate)}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
