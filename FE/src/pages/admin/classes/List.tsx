import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Breadcrumb, Button, Card, Image, Modal, Space, Table, TableProps, Typography, notification, theme } from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { MdAddCircleOutline } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import AdminLayout from '@/layouts/admin'
import AdminSearch from '@/components/search/adminSearch'
import { getClassesList } from '@/apis/classesList.api'
import { weekdays } from '@/utils/day'
import http from '@/utils/http'

interface IMentor {
  fullname: string
}

interface ICourse {
  title: string
}

interface IWorkplace {
  name: string
}
interface DataType {
  _id: string
  image_url?: string
  class_name?: string
  location?: string
  is_active?: boolean
  class_size?: number
  create_at?: string
  start_at?: string
  end_at?: string
  course?: ICourse
  mentor?: IMentor
  workplace?: IWorkplace
}

dayjs.extend(customParseFormat)

const CustomContent = () => {
  const navigate = useNavigate()

  // const queryString: { page?: string } = useQueryString()
  // const page = Number(queryString.page) || 1
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 10
  const search = searchParams.get('search') ?? null

  // const [isActive, setIsActive] = useState(true)
  const [selectedClass, setSelectedClass] = useState<DataType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filteredData, setFilteredData] = useState<any>(null)

  const { data: classData } = useQuery({
    queryKey: ['classes', page, limit],
    queryFn: async () => {
      const res = await getClassesList(page, limit)
      return res.data
    },
  })

  useEffect(() => {
    if (classData) {
      setFilteredData(classData)
    }
  }, [classData])

  useEffect(() => {
    if (search) {
      const filtered = classData?.data.filter(
        (item: any) =>
          item.class_code.toLowerCase().includes(search.toLowerCase()) ||
          item.course.title.toLowerCase().includes(search.toLowerCase()),
      )
      setFilteredData({ data: filtered, total: classData?.total })
    } else {
      navigate(`/admin/classes/all?page=${page}&limit=${limit}`)
      setFilteredData({ data: classData?.data, total: classData?.total })
    }
  }, [limit, page, search, classData])

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    const { current, pageSize } = pagination
    const searchParam = search ? `&search=${search}` : ''
    navigate(`/admin/classes/all?page=${current}&limit=${pageSize}${searchParam}`)
  }

  const handleSearch = (value: string) => {
    setSearchParams({ search: value })
  }

  const handleDelete = async () => {
    try {
      await http.delete(`/class/${selectedClass?._id}`)
      // Perform any necessary actions after successful deletion
      notification.success({
        message: 'Delete successful',
        description: 'The class has been deleted successfully',
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
      dataIndex: 'image_url',
      width: '12.5%',
      render: () => (
        <Image
          src='https://res.cloudinary.com/dar4pvqx2/image/upload/v1693931926/vitebanner_wtcoum.jpg'
          alt='Facility Image'
        />
      ),
    },
    {
      title: <Typography.Text style={{ fontSize: '18px' }}>Class</Typography.Text>,
      dataIndex: 'class_code',
      width: '25%',
      render: (class_code: string, cls: DataType) => (
        <Space direction='vertical'>
          <Typography.Text
            strong
            style={{ fontSize: '22px' }}
          >
            {class_code}
          </Typography.Text>
          <Typography.Text strong>{cls.course?.title}</Typography.Text>
          <Typography.Text>Created at: {dayjs(cls.create_at).format('DD/MM/YYYY')}</Typography.Text>
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
      title: <Typography.Text style={{ fontSize: '18px' }}>Schedule</Typography.Text>,
      dataIndex: 'schedule',
      width: '20%',
      sorter: true,
      render: (schedule: number[], cls: DataType) => (
        <Space direction='vertical'>
          <Typography.Text>
            Time: {dayjs(cls.start_at).format('DD/MM/YYYY')} - {dayjs(cls.end_at).format('DD/MM/YYYY')}
          </Typography.Text>
          <Typography.Text>
            Schedule:{' '}
            {schedule
              .map((day: number) => {
                const weekday = weekdays.find((w) => w.value === day)
                return weekday ? weekday.label : ''
              })
              .join(', ')}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: <Typography.Text style={{ fontSize: '18px' }}>Facility</Typography.Text>,
      width: '15%',
      sorter: true,
      render: (cls: DataType) => (
        <Space direction='vertical'>
          <Typography.Text>{cls.workplace?.name}</Typography.Text>
        </Space>
      ),
    },
    {
      title: <Typography.Text style={{ fontSize: '14px' }}>Number of Students</Typography.Text>,
      dataIndex: 'class_size',
      width: '10%',
      sorter: true,
      render: (class_size: number) => (
        <Space direction='vertical'>
          <Typography.Text>{class_size}</Typography.Text>
        </Space>
      ),
    },
    {
      title: <Typography.Text style={{ fontSize: '18px' }}>Action</Typography.Text>,
      width: '10%',
      render: (cls: DataType) => (
        <Space>
          <Button
            type='primary'
            size='large'
            onClick={() => {
              navigate(`/admin/classes/show/${cls._id}`)
            }}
          >
            <EyeOutlined className='text-white text-[22px]' />
          </Button>
          <Button
            type='primary'
            size='large'
            danger
            onClick={() => {
              setSelectedClass(cls)
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
            title: 'Class',
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
            Class List
          </Typography.Title>
          <Space
            className='flex'
            size='middle'
          >
            <AdminSearch
              endpoint='class'
              keysearch={search ?? ''}
              onChangeInput={handleSearch}
            />
            <Button
              type='primary'
              onClick={() => navigate('/admin/classes/create')}
              style={{ display: 'flex', alignItems: 'center', height: '40px', fontSize: '16px' }}
            >
              <MdAddCircleOutline className='text-[22px]' />
            </Button>
          </Space>
        </div>
        {classData && (
          <Table
            rowKey={(cls: DataType) => cls._id}
            columns={columns}
            dataSource={search ? filteredData?.data : classData.data}
            pagination={{
              position: ['bottomRight'],
              current: Number(page),
              pageSize: Number(limit),
              defaultCurrent: 1,
              defaultPageSize: 10,
              pageSizeOptions: [5, 10, 20],
              showSizeChanger: true,
              showQuickJumper: true,
              total: search ? filteredData?.total : classData.total,
            }}
            onChange={onChange}
            style={{ marginTop: 16 }}
          />
        )}
      </Card>
      <Modal
        title='Confirm Delete'
        onOk={handleDelete}
        okType='danger'
        onCancel={() => setIsModalOpen(false)}
        getContainer={false}
        open={isModalOpen}
      >
        <Typography.Text>Are you sure you want to delete this class?</Typography.Text>
      </Modal>
    </>
  )
}

const AdminListClasses: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminListClasses
