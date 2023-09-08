import React from 'react'
import { Card, Collapse, CollapseProps, Tabs, TabsProps } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { BiBarChart } from 'react-icons/bi'
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai'
import { getCourse } from '@/apis/course.api'
import AdminLayout from '@/layouts/admin'

interface ILessonProps {
  class_id: string
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const itemsCollapse: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Lesson 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'Lesson 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'Lesson 3',
    children: <p>{text}</p>,
  },
]

const CollapseComponent: React.FC = () => {
  return (
    <Collapse
      items={itemsCollapse}
      defaultActiveKey={['1']}
      bordered={false}
      accordion
    />
  )
}

const AdminLessonList = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await getCourse(id as string)
      return res.data.data
    },
  })

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Description`,
      children: `${data ? data.desc : ''}`,
    },
    {
      key: '2',
      label: `Contents`,
      children: <CollapseComponent />,
    },
  ]

  return (
    <Card style={{ width: '100%', margin: '0 8px' }}>
      <Tabs
        defaultActiveKey='1'
        items={items}
        size='large'
      />
    </Card>
  )
}

export default AdminLessonList
