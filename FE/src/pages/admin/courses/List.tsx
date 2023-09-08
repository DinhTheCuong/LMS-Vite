import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Card, Image, Modal, Space, Table, TableProps, Typography, notification } from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { MdAddCircleOutline } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import AdminLayout from '@/layouts/admin'
import AdminSearch from '@/components/search/adminSearch'
import { getCoursesList } from '@/apis/coursesList.api'
import LevelTag from '@/components/tag/LevelTag'
import { COMMON_LEVEL } from '@/utils/level'
import http from '@/utils/http'

interface DataType {
  _id: string
  course_code: string
  image?: string
  title?: string
  location?: string
  is_active?: boolean
  create_at?: string
  formated_date: string
  level: COMMON_LEVEL
}

dayjs.extend(customParseFormat)

const CustomContent = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 10
  const search = searchParams.get('search') ?? null

  const [selectedCourse, setSelectedCourse] = useState<DataType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filteredData, setFilteredData] = useState<any>(null)

  const { data: courseData } = useQuery({
    queryKey: ['courses', page, limit],
    queryFn: async () => {
      const res = await getCoursesList(page, limit)
      return res.data
    },
  })

  useEffect(() => {
    if (courseData) {
      setFilteredData(courseData.data)
    }
  }, [courseData])

  useEffect(() => {
    if (search) {
      const filtered = courseData?.data.filter(
        (item: any) =>
          item.course_code.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase()),
      )
      setFilteredData({ data: filtered, total: courseData?.total })
    } else {
      navigate(`/admin/courses/all?page=${page}&limit=${limit}`)
      setFilteredData({ data: courseData?.data, total: courseData?.total })
    }
  }, [limit, page, search, courseData])

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    const { current, pageSize } = pagination
    const searchParam = search ? `&search=${search}` : ''
    navigate(`/admin/courses/all?page=${current}&limit=${pageSize}${searchParam}`)
  }

  const handleSearch = (value: string) => {
    setSearchParams({ search: value })
  }

  const handleDelete = async () => {
    try {
      await http.delete(`/course/${selectedCourse?._id}`)
      // Perform any necessary actions after successful deletion
      notification.success({
        message: 'Delete successful',
        description: 'The course has been deleted successfully',
      })
    } catch (error: any) {
      notification.error({
        message: 'Delete failed',
        description: error.message,
      })
    }

    setIsModalOpen(false)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: <Typography.Text style={{ fontSize: '18px' }}>Image</Typography.Text>,
      dataIndex: 'image',
      width: '12.5%',
      render: (image: any) => (
        <Image
          src={image.length > 0 ? image : 'https://via.placeholder.com/500x250'}
          alt='Course Image'
        />
      ),
    },
    {
      title: <Typography.Text style={{ fontSize: '18px' }}>Course</Typography.Text>,
      dataIndex: 'course_code',
      width: '45%',
      render: (course_code: string, course: DataType) => (
        <Space direction='vertical'>
          <Typography.Text
            strong
            style={{ fontSize: '22px' }}
          >
            {course_code}: {course.title}
          </Typography.Text>
          <Typography.Text>Created at: {dayjs(course.create_at).format('DD/MM/YYYY')}</Typography.Text>
        </Space>
      ),
      sorter: (a, b) => {
        const dateA: any = a.create_at ? dayjs(a.create_at) : dayjs('')
        const dateB: any = b.create_at ? dayjs(b.create_at) : dayjs('')
        return dateA - dateB
      },
      defaultSortOrder: 'descend',
    },
    {
      title: <Typography.Text style={{ fontSize: '18px' }}>Difficulty</Typography.Text>,
      dataIndex: 'level',
      width: '15%',
      render: (value: COMMON_LEVEL) => (
        <LevelTag
          level={value}
          style={{ fontSize: '14px', padding: '4px 8px' }}
        />
      ),
      filters: [
        {
          text: 'BEGINNER',
          value: 'BEGINNER',
        },
        {
          text: 'INTERMEDIATE',
          value: 'INTERMEDIATE',
        },
        {
          text: 'ADVANCED',
          value: 'ADVANCED',
        },
      ],
      onFilter: (value, { level }) => String(level).indexOf(String(value)) === 0,
    },
    {
      title: <Typography.Text style={{ fontSize: '18px' }}>Action</Typography.Text>,
      width: '10%',
      render: (course: DataType) => (
        <Space>
          <Button
            type='primary'
            size='large'
            onClick={() => {
              navigate(`/admin/courses/show/${course._id}`)
            }}
          >
            <EyeOutlined className='text-white text-[22px]' />
          </Button>
          <Button
            type='primary'
            size='large'
            danger
            onClick={() => {
              setSelectedCourse(course)
              setIsModalOpen(true)
            }}
          >
            <DeleteOutlined className='text-white text-[22px]' />
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <Link to='/admin'>Home</Link>,
          },
          {
            title: 'Courses',
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        <div className='flex justify-between'>
          <Typography.Title
            level={3}
            className='mt-0 mx-1'
          >
            Course List
          </Typography.Title>
          <Space
            className='flex'
            size='middle'
          >
            <AdminSearch
              endpoint='course'
              keysearch={search ?? ''}
              onChangeInput={handleSearch}
            />
            <Button
              type='primary'
              onClick={() => navigate('/admin/courses/create')}
              style={{ display: 'flex', alignItems: 'center', height: '40px', fontSize: '16px' }}
            >
              <MdAddCircleOutline className='text-[22px]' />
            </Button>
          </Space>
        </div>
        {courseData && (
          <Table
            rowKey={(course: DataType) => course._id}
            columns={columns}
            dataSource={search ? filteredData?.data : courseData.data}
            pagination={{
              position: ['bottomRight'],
              current: Number(page),
              pageSize: Number(limit),
              defaultCurrent: 1,
              defaultPageSize: 10,
              pageSizeOptions: [5, 10, 20],
              showSizeChanger: true,
              showQuickJumper: true,
              total: search ? filteredData?.total : courseData.total,
            }}
            onChange={onChange}
            style={{ marginTop: 16 }}
          />
        )}
        <Modal
          title='Confirm Delete'
          onOk={handleDelete}
          okType='danger'
          onCancel={() => setIsModalOpen(false)}
          getContainer={false}
          open={isModalOpen}
        >
          <Typography.Text>Are you sure you want to delete this course?</Typography.Text>
        </Modal>
      </Card>
    </>
  )
}

const AdminListCourses: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminListCourses
