import React, { useState } from 'react'
import { Breadcrumb, Card, Form, Input, Typography, Row, Col, Button, notification, Space, Select } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { RuleObject } from 'antd/es/form'
import http from '@/utils/http'
import AdminLayout from '@/layouts/admin'
import { getWorkplace } from '@/apis/workplaceByID.api'
// import { UploadOutlined } from '@ant-design/icons'

interface IWorkplace {
  name: string
  workplace_code: string
  address: string
  status: string
}

type StatusFacility = 'ON' | 'OFF' | 'UPCOMING'

const CustomContent = () => {
  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [nameValue, setNameValue] = useState('')
  const [codeValue, setCodeValue] = useState('')
  const [addressValue, setAddressValue] = useState('')
  const [statusValue, setStatusValue] = useState<StatusFacility>('ON')

  const updateWorkplace = async (workplace: IWorkplace) => {
    if (!id) {
      throw new Error('Missing id parameter')
    }
    await http.put(`/workplace/${id}`, workplace)
  }

  const { mutate, isLoading } = useMutation(updateWorkplace, {
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

  const { data: workplace } = useQuery({
    queryKey: ['workplaces'],
    queryFn: async () => {
      const res = await getWorkplace(id as string)
      return res.data.data
    },
  })

  if (!workplace) {
    return <Typography.Text>Facility not found</Typography.Text>
  }

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

  const onChange1: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    setNameValue(value)
  }
  const onChange2: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    setNameValue(value)
  }
  const onChange3: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    setNameValue(value)
  }
  const onChange4 = (value: StatusFacility) => {
    setStatusValue(value)
  }

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
            title: `${workplace.name}`,
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        <Form
          form={form}
          onFinish={mutate}
          layout='vertical'
          initialValues={{ ...workplace }}
        >
          <Typography.Title
            level={3}
            className='mt-0 mx-1'
          >
            Update The Facility
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label='Facility Name'
                name='name'
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input
                  required
                  value={nameValue}
                  onChange={onChange1}
                />
              </Form.Item>
              <Form.Item
                label='Facility Code'
                name='workplace_code'
                rules={[{ required: true }]}
              >
                <Input
                  readOnly
                  // required
                  // value={codeValue}
                  // onChange={onChange2}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Facility Location'
                name='address'
                rules={[{ required: true, message: 'Please enter the location' }]}
              >
                <Input
                  required
                  value={addressValue}
                  onChange={onChange3}
                />
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
                  value={statusValue}
                  onChange={onChange4}
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
              <Button
                type='default'
                onClick={() => navigate(`/admin/facilities/show/${id}`)}
              >
                Cancel
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
              >
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

const AdminEditFacilities: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminEditFacilities
