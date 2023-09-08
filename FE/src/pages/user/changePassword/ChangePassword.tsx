import React from 'react'
import { Link } from 'react-router-dom'
import Header from '@/layouts/user/Header'
import Footer from '@/layouts/user/Footer'
import Logo from '@/assets/images/logo/logo-with-shadow.png'
import ChangePassordFrom from './ChangePasswordFrom'

const ChangePassword: React.FC = () => {
  return (
    <>
      <Header />
      <div className='w-full min-h-screen pt-20 pb-[96px] bg-gradient-to-r from-[#304352] to-[#d7d2cc] dark:bg-gradient-to-r dark:from-[#8360c3] dark:to-[#2ebf91]'>
        <div className='bg-white w-[480px] max-md:w-[69%] p-10 pb-6 rounded-lg mx-auto'>
          <img
            src={Logo}
            alt=''
            className='w-[20%]'
          />
          <h1>Change Password</h1>
          <ChangePassordFrom />
          Return to{' '}
          <Link
            to='/'
            className='no-underline text-blue-500'
          >
            Home!
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ChangePassword
