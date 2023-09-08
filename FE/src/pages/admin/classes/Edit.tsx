import React, { useState } from 'react'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
  notification,
} from 'antd'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import AdminLayout from '@/layouts/admin'
import http from '@/utils/http'
import { getClassById } from '@/apis/class.api'
// import { weekdays } from '@/utils/day'
import { getUserListForAdmin } from '@/apis/userForAdmin.api'
import { getCoursesList } from '@/apis/coursesList.api'
import { searchWorkplaceForAdmin } from '@/apis/searchWorkplaceForAdmin'

interface IMentor {
  fullname: string
}

interface IWorkplace {
  name: string
}
interface IClass {
  _id: string
  image_url?: string
  class_name?: string
  location?: string
  is_active?: boolean
  class_size?: number
  start_at?: string
  end_at?: string
  mentor?: IMentor
  workplace?: IWorkplace
}

dayjs.extend(customParseFormat)

const CustomContent = () => {
  const [form] = Form.useForm()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 50

  const weekdays = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
  ]

  // const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList.map((option) => option.value))
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([])

  // const checkAll = plainOptions.length === checkedList.length
  // const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length

  // const onCheckAllChange = (e: CheckboxChangeEvent) => {
  //   setCheckedList(e.target.checked ? plainOptions.map((option) => option.value) : [])
  // }

  // const onChange = (checkedValues: CheckboxValueType[]) => {
  //   setCheckedList(checkedValues)
  // }

  const handleWeekdaysChange = (value: string[]) => {
    setSelectedWeekdays(value)
  }

  const updateClass = async (cls: IClass) => {
    if (!id) {
      throw new Error('Missing id parameter')
    }
    await http.put(`/class/${id}`, cls)
  }

  const { mutate, isLoading } = useMutation(updateClass, {
    onSuccess: () => {
      // Perform any necessary actions after successful creation
      notification.success({
        message: 'Update successful',
        description: 'The class has been updated successfully',
      })
      form.resetFields()
      navigate('/admin/classes/all')
    },
    onError: (error: Error) => {
      // Perform any necessary actions after failed creation
      notification.error({
        message: 'Update failed',
        description: error.message,
      })
    },
  })

  const { data: classByID } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await getClassById(id as string)
      return res.data.data
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

  const { data: mentor } = useQuery({
    queryKey: ['MENTOR', page, limit],
    queryFn: async () => {
      const res = await getUserListForAdmin('MENTOR', page, limit)
      return res.data.data
    },
  })

  if (!classByID) {
    return <Typography.Text>Class not found</Typography.Text>
  }

  // const handleSubmit = async (values: IClass) => {
  //   try {
  //     mutate(values)
  //     notification.success({
  //       message: 'Update successful',
  //       description: 'The Class has been updated successfully',
  //     })
  //   } catch (error) {
  //     notification.error({
  //       message: 'Update failed',
  //       description: 'There was an error updating the Class',
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
            title: <Link to='/admin/classes/all'>Classes</Link>,
          },
          {
            title: `${classByID.class_code}`,
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        <Form
          form={form}
          onFinish={mutate}
          layout='vertical'
          initialValues={{
            ...classByID,
            mentor_id: classByID.mentor?.fullname,
            workplace_id: classByID.workplace?.name,
            course_id: classByID.course?.title,
            start_at: dayjs(classByID.create_at).startOf('day'),
            end_at: dayjs(classByID.end_at).endOf('day'),
          }}
        >
          <Typography.Title
            level={3}
            className='mt-0 mx-1'
          >
            Edit The Class
          </Typography.Title>
          <Row gutter={[24, 16]}>
            <Col
              xs={24}
              lg={12}
            >
              <Form.Item
                label='Course'
                name='course_id'
                rules={[{ required: true, message: 'Please enter the course name' }]}
              >
                <Select
                  options={(course || []).map((data: { _id: string; title: string }) => ({
                    value: data._id,
                    label: data.title,
                  }))}
                  showSearch
                />
              </Form.Item>
              <Form.Item
                label='Mentor'
                name='mentor_id'
                rules={[{ required: true, message: 'Please enter the mentor' }]}
              >
                <Select
                  options={(mentor || []).map((data: { _id: string; fullname: string }) => ({
                    value: data._id,
                    label: data.fullname,
                  }))}
                  showSearch
                />
              </Form.Item>
              <Form.Item
                label='Start Date'
                name='start_at'
                rules={[{ required: true, message: 'Please enter the start date' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format='DD/MM/YYYY'
                />
              </Form.Item>
              <Form.Item
                label='Total Sessions'
                name='total_session'
                rules={[{ required: true, message: 'Please enter the total sessions' }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              lg={12}
            >
              <Form.Item
                label='Facility'
                name='workplace_id'
                rules={[{ required: true, message: 'Please enter the facility' }]}
              >
                <Select
                  options={(workplace || []).map((data: { _id: string; name: string }) => ({
                    value: data._id,
                    label: data.name,
                  }))}
                  showSearch
                />
              </Form.Item>
              <Form.Item
                label='Schedule'
                name='schedule'
                rules={[{ required: true, message: 'Please enter the schedule' }]}
              >
                <Select
                  mode='multiple'
                  placeholder='Select weekdays'
                  value={selectedWeekdays}
                  onChange={handleWeekdaysChange}
                  maxTagCount='responsive'
                >
                  {weekdays.map((weekday) => (
                    <Select.Option
                      key={weekday.value}
                      value={weekday.value}
                    >
                      {weekday.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label='Expected End Date'
                name='end_at'
                rules={[{ required: true, message: 'Please enter the expected end date' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format='DD/MM/YYYY'
                />
              </Form.Item>
              <Form.Item
                label='Number of Students'
                name='class_size'
                rules={[{ required: true, message: 'Please enter the number of students' }]}
              >
                <InputNumber style={{ width: '100%' }} />
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
                onClick={() => navigate(`/admin/classes/show/${id}`)}
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

const AdminEditClasses: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminEditClasses
