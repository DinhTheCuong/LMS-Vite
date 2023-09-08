import React, { useState } from 'react'
import { Button, Modal, Select, SelectProps } from 'antd'
import { handleUserRegistCourse } from '@/apis/userRegistCourse.api'
import { getWorkplacesList } from '@/apis/workplaceList.api'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const LearnRegisterModal: React.FC = (data: any) => {
  const { title, course_code, price, discount, level, session_per_course, _id } = data
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [workplaceId, setWorkplaceId] = useState('64f746f5a6ea2f374d13dee1')

  const workplaceData = useQuery({
    queryKey: ['workplace'],
    queryFn: async () => {
      const res = await getWorkplacesList(1, 50)
      return res.data.data
    },
  }).data

  const options: SelectProps['options'] = []

  workplaceData &&
    workplaceData.map((item: any) => {
      options.push({
        value: item._id,
        label: item.name,
      })
    })

  const handleChange = (value: string | string[]) => {
    setWorkplaceId(value as any)
  }

  const regist = () => {
    handleUserRegistCourse(_id, workplaceId, navigate)
  }

  return (
    <>
      <Button
        type='primary'
        size='large'
        className='w-full mt-4'
        onClick={() => setOpen(true)}
      >
        Learn
      </Button>
      <Modal
        title={<span className='text-xl'>Register the Course {data ? title : ''}</span>}
        centered
        open={open}
        onOk={() => {
          setOpen(false)
          regist()
        }}
        onCancel={() => setOpen(false)}
      >
        <p>
          <span className='text-green-600'>Are you sure you want to register for this course? </span>
          <br />
          <br /> Course code: <span className='text-blue-500'>{course_code}</span>
          <br />
          <br /> Course level:{' '}
          <span className='text-blue-500'>
            {String(level)
              .toLowerCase()
              .replace(/\b\w/g, (x) => x.toUpperCase())}
          </span>
          <br />
          <br /> Total sessions: <span className='text-blue-500'>{session_per_course}</span>
          <br />
          <br /> Price:{' '}
          <span className='text-yellow-500'>
            {Number(discount) ? `$${Math.floor(Number(price) * (1 - Number(discount) / 100))}` : `$${price}`}{' '}
          </span>
          <span className='text-red-500 m-0 p-0 text-xs line-through'>{Number(discount) ? `${price}` : ''}</span>
          <br />
          <br />
          Please choose a facility:{' '}
          <Select
            defaultValue={options[0] as any}
            onChange={handleChange}
            style={{ width: 280 }}
            options={options}
          />
          <br />
        </p>
      </Modal>
    </>
  )
}
export default LearnRegisterModal
