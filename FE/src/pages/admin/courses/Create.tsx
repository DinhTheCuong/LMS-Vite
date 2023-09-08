import React from 'react'
import ImgCrop from 'antd-img-crop'
import {
  Breadcrumb,
  Card,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Upload,
  UploadProps,
  Button,
  Space,
  InputNumber,
  notification,
  Select,
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import AdminLayout from '@/layouts/admin'
import { createCourse } from '@/apis/courseCreate.api'
// import { UploadOutlined } from '@ant-design/icons'

const CustomContent = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(createCourse, {
    onSuccess: () => {
      // Perform any necessary actions after successful creation
      notification.success({
        message: 'Update successful',
        description: 'The course has been updated successfully',
      })
      form.resetFields()
      navigate('/admin/courses/all')
    },
    onError: (error: Error) => {
      // Perform any necessary actions after failed creation
      notification.error({
        message: 'Update failed',
        description: error.message,
      })
    },
  })

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <Link to='/admin'>Home</Link>,
          },
          {
            title: <Link to='/admin/courses/all'>Courses</Link>,
          },
          {
            title: 'Create',
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        <Form
          form={form}
          onFinish={mutate}
          layout='vertical'
        >
          <Typography.Title
            level={3}
            className='mt-0 mx-1'
          >
            Create A New Course
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label='Course Code'
                name='course_code'
                rules={[{ required: true, message: 'Please enter the code' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Sessions per Course'
                name='session_per_course'
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                label='Price'
                name='price'
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Course Title'
                name='title'
                rules={[{ required: true, message: 'Please enter the title' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Level'
                name='level'
              >
                <Select
                  options={[
                    { value: 'BEGINNER', label: 'BEGINNER' },
                    { value: 'INTERMEDIATE', label: 'INTERMEDIATE' },
                    { value: 'ADVANCED', label: 'ADVANCED' },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label='Discount'
                name='discount'
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label='Course Description'
                name='desc'
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          {/* <Col
                span={12}
                style={{ display: 'flex', flexDirection: 'column', margin: '8px 0' }}
              >
                <Typography.Text>* Facility Image</Typography.Text>
                <ImgCrop rotationSlider>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </ImgCrop>
              </Col> */}
          {/* </Row> */}
          <Form.Item>
            <Space
              size='middle'
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                type='default'
                onClick={() => navigate('/admin/courses/all')}
              >
                Cancel
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
              >
                Create
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

const AdminCreateCourses: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminCreateCourses
