import React from 'react'
import { Table, Tag, TableProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  _id: string
  key: number
  fullname: string
  email: string
  phone_number: string
  session: string
  status?: string
}

type StudentList = {
  data: { count: number; data: []; page: number; statusCode: number; total: number; total_page: number }
  searchText: string
  setSearchParams: any
  // session_code: string
  // class_id: string
  // role: string
  filteredData: { data: [] }
}

// const { TextArea } = Input

const StudentListTable: React.FC<StudentList> = (props) => {
  const navigate = useNavigate()
  const { searchText, data, filteredData, setSearchParams } = props

  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'index',
      width: '40px',
      render: (_value, _record, index) => <>{index + 1}</>,
    },
    {
      title: 'Student Name',
      dataIndex: 'fullname',
      width: '140px',
      filteredValue: [searchText],
      onFilter: (value, { fullname }) => String(fullname).toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '212px',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      width: '120px',
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'status',
      width: '100px',
      render: (_, { status }) => (
        <>
          {(status === 'ACTIVE' && (
            <Tag
              color='green'
              key='ACTIVE'
            >
              {status.toUpperCase()}
            </Tag>
          )) ||
            (status === 'INACTIVE' && (
              <Tag
                color='volcano'
                key='INACTIVE'
              >
                {status.toUpperCase()}
              </Tag>
            )) || (
              <Tag
                color='geekblue'
                key='undefined'
              >
                {String('unknown').toUpperCase()}
              </Tag>
            )}
        </>
      ),
      filters: [
        {
          text: 'ACTIVE',
          value: 'active',
        },
        {
          text: 'INACTIVE',
          value: 'inactive',
        },
        {
          text: 'UNKNOWN',
          value: 'unknown',
        },
      ],
      onFilter: (value, { status }) => String(status).indexOf(String(value)) === 0,
    },
    {
      title: 'Day Of Birth',
      dataIndex: 'dob',
      width: '120px',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '120px',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '120px',
    },
    // {
    //     title: 'Day Created',
    //     dataIndex: 'create_at',
    //     width: '120px',
    // },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '120px',
    },

    // {
    //     title: 'Attendance',
    //     render: () => (
    //         <Select
    //             defaultValue='Select'
    //             style={{ width: '100%' }}
    //             options={[
    //                 { value: 'p', label: <span className='text-[#389E0D]'>Present</span> },
    //                 { value: 'ap', label: <span className='text-[#D46B08]'>Absent With Permission</span> },
    //                 { value: 'aop', label: <span className='text-[#6737B5]'>Absent Without Permission</span> },
    //                 { value: 'r', label: <span className='text-[#C41D7F]'>Reserve</span> },
    //             ]}
    //         />
    //     ),
    // },
    // {
    //     title: 'Score',
    //     width: '80px',
    //     render: () => (
    //         <Input
    //             type='number'
    //             placeholder='Input score ...'
    //         />
    //     ),
    // },
    // {
    //     title: 'Comment',
    //     render: () => (
    //         <TextArea
    //             rows={1}
    //             placeholder='Comment here ...'
    //         />
    //     ),
    // },
  ]

  let studentData: DataType[] = []

  if (data !== undefined) {
    studentData = searchText ? filteredData.data : data.data
  }

  const onChange: TableProps<DataType>['onChange'] = (pagination, _filters, _sorter, _extra) => {
    const { current, pageSize } = pagination
    setSearchParams(current)
    navigate(
      // `/teacher/class-detail/session?sesson_code=${props.session_code}&class_id=${props.class_id}&page=${current}&limit=${pageSize}`,
      `/admin/users/students?page=${current}&limit=${pageSize}`,
    )
  }

  return (
    <Table
      pagination={{
        position: ['bottomCenter'],
        defaultCurrent: 1,
        defaultPageSize: 20,
        pageSizeOptions: [10, 20, 40],
        showSizeChanger: true,
        current: data && data.page,
        total: data && data.total,
      }}
      columns={columns}
      dataSource={studentData}
      scroll={{ y: 600 }}
      bordered
      size='small'
      style={{ padding: '0 16px' }}
      rowKey={(_record) => _record._id}
      onChange={onChange}
    />
  )
}

export default StudentListTable
