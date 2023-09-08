import React from 'react'
import { Radio } from 'antd'

const Sidebar: React.FC<{ handleFilterLevel?: any; handleFilterRate?: any }> = (props) => {
  return (
    <div
      className='bg-white dark:bg-[#1E293B] dark:border-none rounded-lg border-[1px] border-solid border-gray-200'
      style={{ boxShadow: '0 0 10px rgba(0,0,0,.18)', cursor: 'pointer', border: '1px solid rgba(0,0,0,.1)' }}
    >
      <p className='font-bold text-lg m-0 py-4 px-5 text-[#F56A00] dark:text-gray-100 border-0 border-b-[1px] border-solid border-gray-300 dark:border-gray-500'>
        Filter
      </p>

      <div className='px-5 text-gray-500 border-0 border-b-[1px] border-solid border-gray-300 dark:border-gray-500 pb-4'>
        <p className='font-bold'>Level</p>
        <div className='flex flex-col'>
          <Radio.Group
            onChange={props.handleFilterLevel}
            defaultValue={'all'}
          >
            <div className='mb-2'>
              <Radio value='all'>
                <p className='m-0 text-yellow-500'>All Level</p>
              </Radio>
            </div>
            <div className='mb-2'>
              <Radio value='beginner'>
                <p className='m-0 text-[#1D39C4]'>Beginner</p>
              </Radio>
            </div>
            <div className='mb-2'>
              <Radio value='intermediate'>
                <p className='m-0 text-[#389E0D]'>Intermediate</p>
              </Radio>
            </div>
            <div className='mb-2'>
              <Radio value='advanced'>
                <p className='m-0 text-[#D4380D]'>Advanced</p>
              </Radio>
            </div>
          </Radio.Group>
        </div>
      </div>

      <div className='px-5 text-gray-500  mb-4'>
        <p className='font-bold'>Rating</p>
        <div className='flex flex-col'>
          <Radio.Group
            onChange={props.handleFilterRate}
            defaultValue={''}
          >
            <div className='mb-2'>
              <Radio value=''>
                <p className='m-0 text-md text-[#F59E0B]'>All Rate</p>
              </Radio>
            </div>
            <div className='mb-2'>
              <Radio value='5'>
                <p className='m-0 text-xl text-[#F59E0B]'>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
              </Radio>
            </div>
            <div className='mb-2'>
              <Radio value='4'>
                <p className='m-0 text-xl text-[#F59E0B]'>&#9733;&#9733;&#9733;&#9733;</p>
              </Radio>
            </div>
            <div className='mb-2'>
              <Radio value='3'>
                <p className='m-0 text-xl text-[#F59E0B]'>&#9733;&#9733;&#9733;</p>
              </Radio>
            </div>
          </Radio.Group>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
