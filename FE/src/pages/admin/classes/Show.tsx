import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Card, Typography, Row, Col, Divider, Space, Button, Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import AdminLayout from '@/layouts/admin'
import { ShowButtonStyle } from '@/utils/style'
import { getClassById } from '@/apis/class.api'
import { weekdays } from '@/utils/day'
import { getStudentsByClassID } from '@/apis/studentsByClassId.api'

dayjs.extend(customParseFormat)

const CustomContent = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: classByID } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await getClassById(id as string)
      return res.data.data
    },
  })

  const { data: studentsByClassID } = useQuery({
    queryKey: ['studentByclassID'],
    queryFn: async () => {
      const res = await getStudentsByClassID(id as string)
      return res.data.data
    },
  })

  if (!classByID) {
    return <Typography.Text>Class not found</Typography.Text>
  }

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <Link to='/admin'>Home</Link>,
          },
          {
            title: <Link to='/admin/classes/all'>Classes</Link>,
          },
          {
            title: `${classByID.class_code}`,
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Typography.Title
              level={3}
              className='mt-0 mx-1'
            >
              {classByID.class_code}
            </Typography.Title>
            <Space direction='vertical'>
              <Typography.Text
                className='mt-2 mx-1'
                style={{ fontSize: '18px' }}
              >
                Course: {classByID.course?.title}
              </Typography.Text>
              <Typography.Text
                className='mt-2 mx-1'
                style={{ fontSize: '18px' }}
              >
                Mentor: {classByID.mentor?.fullname}
              </Typography.Text>
              <Typography.Text
                className='mt-2 mx-1'
                style={{ fontSize: '18px' }}
              >
                Time: {dayjs(classByID.start_at).format('DD/MM/YYYY')} - {dayjs(classByID.end_at).format('DD/MM/YYYY')}
              </Typography.Text>
              <Typography.Text
                className='mt-2 mx-1'
                style={{ fontSize: '18px' }}
              >
                Schedule:{' '}
                {classByID.schedule
                  .map((day: number) => {
                    const weekday = weekdays.find((w) => w.value === day)
                    return weekday ? weekday.label : ''
                  })
                  .join(', ')}
              </Typography.Text>
            </Space>
          </Col>
          <Divider />
          <Col span={24}>
            <Space direction='vertical'>
              <Typography.Title
                level={4}
                className='-mt-1'
              >
                Student List
              </Typography.Title>
              {/* <Typography.Text>THIS IS THE CLASS DESCRIPTION</Typography.Text> */}
              <Table />
            </Space>
          </Col>
        </Row>
        <Space
          size='middle'
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}
        >
          <Button
            type='default'
            style={ShowButtonStyle}
            onClick={() => navigate('/admin/classes/all')}
          >
            Back
          </Button>
          <Button
            type='primary'
            style={ShowButtonStyle}
            onClick={() => navigate(`/admin/classes/edit/${id}`)}
          >
            Edit
          </Button>
        </Space>
      </Card>
    </>
  )
}

const AdminShowClasses: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminShowClasses
