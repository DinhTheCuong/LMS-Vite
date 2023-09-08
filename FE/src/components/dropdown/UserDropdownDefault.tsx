import React from 'react'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { BsPersonAdd } from 'react-icons/bs'
import { IoMdLogIn } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link
        to='/login'
        className='flex items-center text-gray-600 font-bold'
      >
        <IoMdLogIn className='text-2xl mr-2 p-2 pl-0' />
        Login
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link
        to='/register'
        className='flex items-center text-gray-600 font-bold'
      >
        <BsPersonAdd className='text-2xl mr-2 p-2 pl-0' />
        Register
      </Link>
    ),
  },
]

const UserDropDown: React.FC = () => {
  return (
    <Dropdown
      menu={{ items }}
      placement='bottomRight'
      arrow
    >
      <a
        target='_blank'
        className='flex items-center no-underline text-gray-600 dark:text-gray-100'
      >
        <FaUserCircle className='text-3xl cursor-pointer' />
      </a>
    </Dropdown>
  )
}

export default UserDropDown
