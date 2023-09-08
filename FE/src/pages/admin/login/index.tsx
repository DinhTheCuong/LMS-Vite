import React from 'react'
import { Helmet } from 'react-helmet'
import { ConfigProvider } from 'antd'
import LoginForm from './LoginForm'
import Logo from '@/assets/images/logo/logo-with-shadow.png'

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Vite Education - Admin</title>
        <meta charSet='UTF-8' />
        <link
          rel='icon'
          type='image/svg+xml'
          href='/vite.svg'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
      </Helmet>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorFillAlter: '#e5e7eb',
              colorBgContainer: '#e5e7eb',
              colorTextPlaceholder: '#6b7280',
              colorText: 'black',
              colorIcon: '#6b7280',
              colorBorder: '#d9d9d9',
            },
          },
        }}
      >
        <div className='w-full min-h-screen pt-20 pb-[96px] bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black'>
          <div className='bg-white w-[480px] p-10 pb-4 rounded-lg mx-auto'>
            <img
              src={Logo}
              alt=''
              className='w-[20%]'
            />
            <h1 className='text-black'>Login</h1>
            <LoginForm />
          </div>
        </div>
      </ConfigProvider>
    </>
  )
}

export default Login
