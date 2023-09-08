import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import handleResetPassword from '@/apis/resetPassword.api'
import { useQueryString } from '@/utils/utils'

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate()
  const [resetPasswordValue, setResetPasswordValue] = useState({
    id: '',
    token: '',
    newPassword: '',
  })
  const queryString: { id?: string; token?: string } = useQueryString()

  return (
    <Form
      name='normal_login'
      initialValues={{ remember: true }}
      layout='vertical'
    >
      <Form.Item
        name='password'
        label={<p className='font-bold my-2'>New password</p>}
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
      >
        <Input.Password
          size='large'
          type='password'
          placeholder='********'
          onChange={(e) =>
            setResetPasswordValue({
              newPassword: e.target.value,
              id: queryString.id || '',
              token: queryString.token || '',
            })
          }
        />
      </Form.Item>

      <Form.Item>
        <Button
          size='large'
          type='primary'
          htmlType='submit'
          className='w-full'
          onClick={() => handleResetPassword(resetPasswordValue, navigate)}
        >
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ResetPasswordForm
