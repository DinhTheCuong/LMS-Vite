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
  notification,
  Space,
  Select,
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import AdminLayout from '@/layouts/admin'
import { createWorkplace } from '@/apis/workplaceCreate.api'
// import { UploadOutlined } from '@ant-design/icons'

interface IWorkplace {
  name: string
  workplace_code: string
  address: string
  status: string
}

const CustomContent = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(createWorkplace, {
    onSuccess: () => {
      // Perform any necessary actions after successful creation
      notification.success({
        message: 'Update successful',
        description: 'The facility has been updated successfully',
      })
      form.resetFields()
      navigate('/admin/facilities/all')
    },
    onError: (error: Error) => {
      // Perform any necessary actions after failed creation
      notification.error({
        message: 'Update failed',
        description: error.message,
      })
    },
  })

  // const handleSubmit = async (values: IWorkplace) => {
  //   try {
  //     mutate(values)
  //     notification.success({
  //       message: 'Update successful',
  //       description: 'The facility has been updated successfully',
  //     })
  //   } catch (error) {
  //     notification.error({
  //       message: 'Update failed',
  //       description: 'There was an error updating the facility',
  //     })
  //   }
  // }

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <Link to='/admin'>Home</Link>,
          },
          {
            title: <Link to='/admin/facilities/all'>Facilities</Link>,
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
            Create A New Facility
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label='Facility Name'
                name='name'
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Facility Code'
                name='workplace_code'
                rules={[{ required: true, message: 'Please enter the code' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Facility Location'
                name='address'
                rules={[{ required: true, message: 'Please enter the location' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Facility Status'
                name='status'
                rules={[{ required: true, message: 'Please select the status' }]}
              >
                <Select
                  options={[
                    { label: 'INACTIVE', value: 'OFF' },
                    { label: 'ACTIVE', value: 'ON' },
                    { label: 'UPCOMING', value: 'UPCOMING' },
                  ]}
                />
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
              <Button type='default'>Cancel</Button>
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

const AdminCreateFacilities: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminCreateFacilities
