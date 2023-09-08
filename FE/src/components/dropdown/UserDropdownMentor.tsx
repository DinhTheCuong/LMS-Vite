import React from 'react'
import { Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { IoMdLogOut } from 'react-icons/io'
import { RiUserSettingsLine, RiShieldKeyholeLine } from 'react-icons/ri'
import { BsPersonVideo3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import handleLogout from '@/apis/logout.api'

const UserDropdownMentor: React.FC<{ username: any; avatar: any }> = (props: any) => {
  const navigate = useNavigate()
  const USER = JSON.parse(localStorage.getItem('user') as string)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div className='flex text-lg text-[#F56A00] items-center justify-center font-bold'>{props.username}</div>,
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
            if (USER.role === 'MENTOR' || 'ADMIN') {
              navigate('/teacher/classes-list')
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
      key: '3',
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
      key: '4',
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
      key: '5',
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
          style={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderWidth: '1px',
            borderColor: '#ccc',
            backgroundColor: '#F1F5F9',
          }}
          src={
            props.avatar
              ? props.avatar
              : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.floor(Math.random() * 10)}`
          }
        ></Avatar>
      </a>
    </Dropdown>
  )
}

export default UserDropdownMentor
