import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/images/logo/logo-with-shadow.png'

const SendMailDone: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='h-screen flex items-center'>
      <div className='max-w-[1280px] mx-auto flex flex-col items-center'>
        <img
          src={logo}
          alt=''
          className='w-[16%] my-10'
        />
        <span className='text-3xl font-bold dark:text-gray-200'>Hello!</span>
        <p className='text-gray-500'>
          You have request us to send a link to reset to password for your Vite Education Account!
        </p>
        <Button
          type='primary'
          onClick={() => navigate('/')}
        >
          Return Home &gt;
        </Button>
        <p className='text-gray-500'>If you didn&#39;t initiate this request, you can ignore this email!</p>
        <span className='text-gray-500'>Thank!</span>
        <p className='font-bold text-gray-600 dark:text-gray-400'>DropTeam</p>
      </div>
    </div>
  )
}

export default SendMailDone
