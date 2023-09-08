import React from 'react'
import { MdOutlineClass, MdConveyorBelt, MdOutlinePlayLesson } from 'react-icons/md'
import Divider from 'antd/es/divider'
import { Link } from 'react-router-dom'

const SidebarTeacher: React.FC = () => {
  return (
    <div
      className='col-span-1 row-span-auto p-4 bg-white dark:bg-[#1E293B] dark:border-none rounded-lg border-[1px] border-solid border-gray-200'
      style={{ boxShadow: '0 0 10px rgba(0,0,0,.18)', cursor: 'pointer', border: '1px solid rgba(0,0,0,.1)' }}
    >
      <p className=' m-0 text-xl text-[#F56A00] font-bold px-2'>DASHBOARD</p>
      <Divider
        style={{ marginBlock: '10px' }}
        className='dark:bg-gray-600'
      />

      <Link
        to='/teacher/classes-list?page=1&limit=10'
        className='flex items-center no-underline text-gray-600 dark:text-gray-400 hover:bg-[#E2E8F0] dark:hover:bg-[#0F172A] hover:text-[#64748B] p-2 py-4 rounded-md'
      >
        <MdOutlineClass className='mr-2 text-xl' />
        Classes
      </Link>
      <Link
        to='/teacher/courses-list?page=1&limit=10'
        className='flex items-center no-underline text-gray-600 dark:text-gray-400 hover:bg-[#E2E8F0] dark:hover:bg-[#0F172A] hover:text-[#64748B] p-2 py-4 rounded-md'
      >
        <MdConveyorBelt className='mr-2 text-xl' />
        Courses
      </Link>
      {/* <Link
        to='/teacher/courses-list?page=1&limit=10'
        className='flex items-center no-underline text-gray-600 dark:text-gray-400 hover:bg-[#E2E8F0] dark:hover:bg-[#0F172A] hover:text-[#64748B] p-2 py-4 rounded-md'
      >
        <MdOutlinePlayLesson className='mr-2 text-xl' />
        Lessons
      </Link> */}
    </div>
  )
}

export default SidebarTeacher
