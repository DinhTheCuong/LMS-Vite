import React from 'react'
import { Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { IoMdLogOut } from 'react-icons/io'
import { RiUserSettingsLine, RiAdminLine, RiShieldKeyholeLine } from 'react-icons/ri'
import { BsPersonVideo3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import handleLogout from '@/apis/logout.api'

const UserDropdownAdmin: React.FC<{ username: any; avatar: any }> = (props: any) => {
  const navigate = useNavigate()
  const USER = JSON.parse(localStorage.getItem('user') as string)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div className='flex items-center justify-center text-lg text-[#F56A00] font-bold'>{props.username}</div>,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => {
            if (USER.role === 'ADMIN') {
              navigate('/admin')
            }
          }}
        >
          <RiAdminLine className='text-2xl mr-2 p-2 pl-0' />
          Admin Dashboard
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => {
            if (USER.role === 'ADMIN') {
              navigate('/teacher/classes-list?page=1&limit=10')
            }
          }}
        >
          <BsPersonVideo3 className='text-2xl mr-2 p-2 pl-0' />
          Mentor Page
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => navigate(`/edit-profile?id=${USER.id}`)}
        >
          <RiUserSettingsLine className='text-2xl mr-2 p-2 pl-0' />
          Edit Profile
        </div>
      ),
    },
    {
      key: '5',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => navigate('/change-password')}
        >
          <RiShieldKeyholeLine className='text-2xl mr-2 p-2 pl-0' />
          Change Password
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '6',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => handleLogout(navigate)}
        >
          <IoMdLogOut className='text-2xl mr-2 p-2 pl-0' />
          Logout
        </div>
      ),
    },
  ]
  return (
    <Dropdown
      menu={{ items }}
      placement='bottomRight'
      arrow
    >
      <a target='_blank'>
        <Avatar
          src={
            props.avatar
              ? props.avatar
              : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.floor(Math.random() * 10)}`
          }
          style={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderWidth: '1px',
            borderColor: '#ccc',
            backgroundColor: '#F1F5F9',
          }}
        ></Avatar>
      </a>
    </Dropdown>
  )
}

export default UserDropdownAdmin
