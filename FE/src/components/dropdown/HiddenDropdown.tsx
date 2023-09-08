import React from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { RiHome2Line, RiInformationLine } from 'react-icons/ri'
import { CgMenuGridO } from 'react-icons/cg'
import { MdConveyorBelt, MdOutlineContactSupport } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const HiddenDropdown: React.FC<{}> = () => {
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => navigate('/')}
        >
          <RiHome2Line className='text-2xl mr-2 p-2 pl-0' />
          Home Page
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => navigate('/courses-list?page=1&limit=10')}
        >
          <MdConveyorBelt className='text-2xl mr-2 p-2 pl-0' />
          Courses Page
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => navigate(`#`)}
        >
          <RiInformationLine className='text-2xl mr-2 p-2 pl-0' />
          About Page
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div
          className='flex items-center text-gray-600 font-bold'
          onClick={() => navigate('#')}
        >
          <MdOutlineContactSupport className='text-2xl mr-2 p-2 pl-0' />
          Contact Page
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
      <div className='hidden max-md:flex mr-10 w-[32px] h-[32px] cursor-pointer bg-gray-200 hover:bg-gray-300 p-0 rounded-full items-center justify-center  border-none focus:outline-none dark:focus:ring-gray-700'>
        <CgMenuGridO className='text-2xl text-gray-600' />
      </div>
    </Dropdown>
  )
}

export default HiddenDropdown
