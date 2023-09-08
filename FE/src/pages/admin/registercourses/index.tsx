import React, { useState } from 'react'
import { Breadcrumb, Card, Form, Input, Typography, Row, Col, Button, notification, Space, Select } from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import AdminLayout from '@/layouts/admin'
import { getCoursesList } from '@/apis/coursesList.api'
import { searchWorkplaceForAdmin } from '@/apis/searchWorkplaceForAdmin'
import { registerCourseForAdmin } from '@/apis/registerCourse.api'
import { getUserListForAdmin } from '@/apis/userForAdmin.api'

const CustomContent = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined)
  const [selectedWorkplace, setSelectedWorkplace] = useState<string | undefined>(undefined)
  const [selectedStudent, setSelectedStudent] = useState<string | undefined>(undefined)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 50

  const { mutate, isLoading } = useMutation(registerCourseForAdmin, {
    onSuccess: () => {
      // Perform any necessary actions after successful creation
      notification.success({
        message: 'Update successful',
        description: 'The student has been successfully registered',
      })
      form.resetFields()
      // navigate('/admin/register/all')
    },
    onError: (error: Error) => {
      // Perform any necessary actions after failed creation
      notification.error({
        message: 'Update failed',
        description: error.message,
      })
    },
  })

  const { data: course } = useQuery({
    queryKey: ['courses', page, limit],
    queryFn: async () => {
      const res = await getCoursesList(page, limit)
      return res.data.data
    },
  })

  const { data: workplace } = useQuery({
    queryKey: ['workplaces'],
    queryFn: async () => {
      const res = await searchWorkplaceForAdmin('ON')
      return res.data.data
    },
  })

  const { data: students } = useQuery({
    queryKey: ['user', page, limit],
    queryFn: async () => {
      const res = await getUserListForAdmin('STUDENT', page, limit)
      return res.data.data
    },
  })

  const OnCourseChange = (value: string) => {
    setSelectedCourse(value)
    // const { data: courseByID } = useQuery({
    //   queryKey: ['courseByID'],
    //   queryFn: async () => {
    //     const res = await getCourse(value)
    //     return res.data.data
    //   },
    // })
    // console.log(courseByID)
  }

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <Link to='/admin'>Home</Link>,
          },
          {
            title: 'Register Course',
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        {/* <Typography.Title
          level={3}
          className='mt-0 mx-1'
        >
          Register For New Student
        </Typography.Title> */}
        <Button
          type='primary'
          htmlType='submit'
          loading={isLoading}
        >
          Register For New Student
        </Button>
        {/* <Form
          form={form}
          onFinish={mutate}
          layout='vertical'
        >
          <Typography.Title
            level={3}
            className='mt-0 mx-1'
          >
            Register Course Form
          </Typography.Title>
          <Row gutter={[24, 8]}>
            <Col span={12}>
              <Form.Item
                label='Course Title'
                name='course_id'
                rules={[{ required: true, message: 'Please enter the course title' }]}
              >
                <Select
                  placeholder='Select'
                  options={(course || []).map((data: { _id: string; title: string }) => ({
                    value: data._id,
                    label: data.title,
                  }))}
                  value={selectedCourse}
                  onChange={OnCourseChange}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Facility Name'
                name='workplace_id'
                rules={[{ required: true, message: 'Please enter the facility name' }]}
              >
                <Select
                  placeholder='Select'
                  options={(workplace || []).map((data: { _id: string; name: string }) => ({
                    value: data._id,
                    label: data.name,
                  }))}
                  value={selectedWorkplace}
                  onChange={(value) => setSelectedWorkplace(value)}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Student Name'
                name='student_id'
                rules={[{ required: true, message: 'Please enter the student name' }]}
              >
                <Select
                  placeholder='Select'
                  options={(students || []).map((data: { _id: string; fullname: string }) => ({
                    value: data._id,
                    label: data.fullname,
                  }))}
                  // mode='multiple'
                  // maxTagCount='responsive'
                  value={selectedStudent}
                  onChange={(value) => setSelectedStudent(value)}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Note'
                name='note'
                rules={[{ required: true, message: 'Please enter some notes' }]}
              >
                <Input.TextArea placeholder='Type...' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space
              size='middle'
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                type='default'
                onClick={() => navigate('/admin/classes/all')}
              >
                Cancel
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
              >
                Register
              </Button>
            </Space>
          </Form.Item>
        </Form> */}
      </Card>
    </>
  )
}

const AdminRegisterCourse: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminRegisterCourse
