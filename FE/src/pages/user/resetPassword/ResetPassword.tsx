import React from 'react'
import { Link } from 'react-router-dom'
import Header from '@/layouts/user/Header'
import Footer from '@/layouts/user/Footer'
import ResetPasswordForm from './ResetPasswordForm'
import Logo from '@/assets/images/logo/logo-with-shadow.png'

const ResetPassword: React.FC = () => {
  return (
    <>
      <Header />
      <div className='w-full min-h-screen pt-20 pb-[96px] dark:bg-gradient-to-r dark:from-[#6441A5] dark:to-[#2a0845] bg-gradient-to-r from-[#FFA17F] to-[#00223E]'>
        <div className='bg-white w-[480px] p-10 pb-6 rounded-lg mx-auto'>
          <img
            src={Logo}
            alt=''
            className='w-[20%]'
          />
          <h1>Reset Password</h1>
          <p>Fill the form to reset your password.</p>
          <ResetPasswordForm />
          Return to{' '}
          <Link
            to='/login'
            className='no-underline text-blue-500'
          >
            Login!
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ResetPassword
