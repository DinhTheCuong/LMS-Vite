import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Logo from '@/assets/images/logo/logo-with-shadow.png'
import Header from '@/layouts/user/Header'
import Footer from '@/layouts/user/Footer'

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <div className='w-full pt-20 pb-[96px] bg-gradient-to-r from-[#FEAC6E] via-[#C779D0] to-[#4BC0C8] dark:bg-gradient-to-r dark:from-[#12c2e9] dark:via-[#c491ed] dark:to-[#f7797d]'>
        <div className='bg-white w-[480px] max-md:w-[69%] p-10 pb-4 rounded-lg mx-auto'>
          <img
            src={Logo}
            alt=''
            className='w-[20%]'
          />
          <h1>Login</h1>
          Don’t have an account?{' '}
          <Link
            to='/register'
            className='no-underline text-blue-500'
          >
            Register now!
          </Link>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
