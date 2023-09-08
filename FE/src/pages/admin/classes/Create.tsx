import React, { useEffect, useState } from 'react'
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Select,
  Space,
  Typography,
  notification,
} from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import AdminLayout from '@/layouts/admin'
import { createClass } from '@/apis/classCreate.api'
import { getUserListForAdmin } from '@/apis/userForAdmin.api'
import { getCoursesList } from '@/apis/coursesList.api'
import { searchWorkplaceForAdmin } from '@/apis/searchWorkplaceForAdmin'
import { getRegisterCourseList } from '@/apis/registerCourse.api'
import { getCourse } from '@/apis/course.api'
import { weekdays } from '@/utils/day'
import { addStudentToClass } from '@/apis/addStudentToClass.api'

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
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 50

  // the values of selectedCourse and selectedWorkplace respectively return the corresponding Id
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined)
  const [selectedWorkplace, setSelectedWorkplace] = useState<string | undefined>(undefined)

  const warningText = `A minimum of 10 students is required to create a class. Otherwise, class creation is not permitted.`
  // Cần tối thiểu 10 học viên để tạo lớp học. Mặt khác, việc tạo lớp không được phép.

  // const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList.map((option) => option.value))
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([])

  const handleWeekdaysChange = (value: string[]) => {
    setSelectedWeekdays(value)
  }

  // const { mutate, isLoading } = useMutation(
  //   async (formData: any) => {
  //     const addedData = {
  //       student_id: formData.student_id,
  //       class_id: formData.class_id,
  //     }
  //     const classData = {
  //       course_id: formData.course_id,
  //       mentor_id: formData.mentor_id,
  //       start_at: formData.start_at,
  //       total_session: formData.total_session,
  //       workplace_id: formData.workplace_id,
  //       schedule: formData.schedule,
  //       end_at: formData.end_at,
  //       class_size: formData.class_size,
  //     }
  //     await Promise.all([addStudentToClass(addedData), createClass(classData)])
  //   },
  //   {
  //     onSuccess: () => {
  //       // Perform any necessary actions after successful creation
  //       notification.success({
  //         message: 'Update successful',
  //         description: 'The class has been updated successfully',
  //       })
  //       form.resetFields()
  //       navigate('/admin/classes/all')
  //     },
  //     onError: (error: Error) => {
  //       // Perform any necessary actions after failed creation
  //       notification.error({
  //         message: 'Update failed',
  //         description: error.message,
  //       })
  //     },
  //   },
  // )

  const { mutate, isLoading } = useMutation(createClass, {
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

  const { data: course } = useQuery({
    queryKey: ['courses', page, limit],
    queryFn: async () => {
      const res = await getCoursesList()
      return res.data.data
    },
  })

  const { data: courseSessionById } = useQuery({
    queryKey: ['courseById', selectedCourse],
    queryFn: async () => {
      const res = await getCourse(selectedCourse as string)
      return res.data.data
    },
    enabled: !!selectedCourse,
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

  const { data: filteredStudents } = useQuery({
    queryKey: ['regist-course', selectedWorkplace, selectedCourse, page, limit],
    queryFn: async () => {
      const res = await getRegisterCourseList(selectedWorkplace, selectedCourse, page, limit)
      return res.data.data
    },
    enabled: !!selectedWorkplace && !!selectedCourse,
  })

  const studentDataOptions = (filteredStudents || []).map((data: { _id: string; fullname: string }) => ({
    value: data._id,
    label: data.fullname,
  }))

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([])
  const [indeterminate, setIndeterminate] = useState<boolean>(false)
  const [checkAll, setCheckAll] = useState<boolean>(false)

  useEffect(() => {
    form?.setFieldValue('total_session', courseSessionById?.session_per_course)
  }, [courseSessionById, form])

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < studentDataOptions.length)
    setCheckAll(list.length === studentDataOptions.length)
  }

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? studentDataOptions.map((option: any) => option.value) : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
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
          initialValues={{ total_session: courseSessionById?.session_per_course }}
        >
          <Typography.Title
            level={3}
            className='mt-0 mx-1'
          >
            Create A New Class
          </Typography.Title>
          <Alert
            message='Warning'
            description={warningText}
            type='warning'
            showIcon
            style={{ marginBottom: '1rem' }}
          />
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
                  value={selectedCourse}
                  onChange={(value) => setSelectedCourse(value)}
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
                  value={selectedWorkplace}
                  onChange={(value) => setSelectedWorkplace(value)}
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
            {/* {selectedCourse && selectedWorkplace && (
              <Col span={24}>
                <Form.Item>
                  <Card>
                    <Typography.Paragraph
                      strong
                      style={{ fontSize: '24px' }}
                    >
                      Enrollment List
                    </Typography.Paragraph>
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange}
                      checked={checkAll}
                    >
                      Check all
                    </Checkbox>
                    <Divider />
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      defaultValue={studentDataOptions.map((option: any) => option.value)}
                      value={checkedList}
                      onChange={onChange}
                    >
                      <Row gutter={[16, 16]}>
                        {studentDataOptions.map((option: any) => (
                          <Col
                            span={8}
                            key={option.value}
                          >
                            <Checkbox value={option.value}>{option.label}</Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  </Card>
                </Form.Item>
              </Col>
            )} */}
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
                onClick={() => navigate('/admin/classes/all')}
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

const AdminCreateClasses: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminCreateClasses
