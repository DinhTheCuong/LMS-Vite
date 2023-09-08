import React, { useState } from 'react'
import { Table, Tag, Select, Input, TableProps, InputNumber, message, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { BiSolidSave } from 'react-icons/bi'

interface DataType {
  _id: string
  key: number
  student: { fullname: string; email: string; phone_number: string }
  status?: string
  attendance?: string
  score?: number
  comment?: string
  disabled?: boolean
}

type StudentList = {
  data: { count: number; data: []; page: number; statusCode: number; total: number; total_page: number }
  searchText: string
  setSearchParams: any
  session_code: string
  class_id: string
  filteredData: { data: [] }
  handleBeforeSubmit: any
}

const { TextArea } = Input

const DetailPerSessionTable: React.FC<StudentList> = (props) => {
  const navigate = useNavigate()

  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'index',
      width: '40px',
      render: (_value, _record, index) => index + 1,
    },
    {
      title: 'Student Name',
      dataIndex: 'student',
      width: '140px',
      render: (student) => student.fullname,
      onFilter: (value, { student }) =>
        student && String(student.fullname).toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: 'Email',
      dataIndex: 'student',
      width: '212px',
      render: (student) => student.email,
    },
    {
      title: 'Phone Number',
      dataIndex: 'student',
      width: '120px',
      render: (student) => student.phone_number,
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
      title: 'Attendance',
      render: (_attendance, record) => (
        <Select
          disabled={record.disabled}
          defaultValue='Select'
          style={{ width: '100%' }}
          options={[
            { value: 'PRESENT', label: <span className='text-[#389E0D]'>Present</span> },
            { value: 'ABSENT WITH PERMISSION', label: <span className='text-[#D46B08]'>Absent With Permission</span> },
            {
              value: 'ABSENT WITHOUT PERMISSION',
              label: <span className='text-[#6737B5]'>Absent Without Permission</span>,
            },
            { value: 'RESERVE', label: <span className='text-[#C41D7F]'>Reserve</span> },
          ]}
          onChange={(value) => handleAttendanceChange(value, record)}
        />
      ),
    },
    {
      title: 'Score',
      width: '80px',
      render: (_score, record) => (
        <InputNumber
          disabled={record.disabled}
          placeholder='Input score ...'
          min={0}
          max={10}
          controls={false}
          style={{ width: '100%' }}
          required
          onBlur={(event) => handleScoreChange(event, record)}
        />
      ),
    },
    {
      title: 'Comment',
      render: (_comment, record) => (
        <TextArea
          disabled={record.disabled}
          rows={1}
          placeholder='Comment here ...'
          onBlur={(event) => handleCommentChange(event, record)}
        />
      ),
    },
    {
      title: 'Action',
      width: '60px',
      render: (_value, record) => (
        <Button
          type='link'
          icon={<BiSolidSave className='w-6 h-6 text-green-600 active:text-green-900' />}
          onClick={() => {
            props.handleBeforeSubmit(newAttendance)
            handleDisableRow(record)
            message.success('Saved!')
          }}
        />
      ),
    },
  ]

  let data: DataType[] = []

  if (props.data !== undefined) {
    data = props.searchText ? props.filteredData.data : props.data.data
  }

  type AttendanceObj = {
    session_id: string
    student_id: string
    status?: string
    score?: number
    comment?: string
  }

  // Attendance Method
  const [newAttendance, setNewAttendance] = useState<AttendanceObj>()

  const handleAttendanceChange = (value: any, record: any) => {
    const studentAttendance: {
      session_id: string
      student_id: any
      status: string
    } = {
      session_id: record._id,
      student_id: record.student._id,
      status: value,
    }
    setNewAttendance(studentAttendance)
  }
  localStorage.setItem('attendanceStudent', JSON.stringify(newAttendance))

  const handleScoreChange = (event: any, _record?: any) => {
    if (event.target.value === '') {
      message.error('Please input Score as a Number!')
    } else {
      const studentScore = { ...newAttendance, score: event.target.value }
      setNewAttendance(studentScore as any)
    }
    localStorage.setItem('attendanceStudent', JSON.stringify(newAttendance))
  }

  const handleCommentChange = (event: any, _record?: any) => {
    if (event.target.value !== '') {
      const studentComment = { ...newAttendance, comment: event.target.value }
      setNewAttendance(studentComment as any)
      localStorage.setItem('attendanceStudent', JSON.stringify(newAttendance))
    }
  }

  // Filter Method
  const onChange: TableProps<DataType>['onChange'] = (pagination, _filters, _sorter, _extra) => {
    const { current, pageSize } = pagination
    props.setSearchParams(current)
    navigate(
      `/teacher/class-detail/session?sesson_code=${props.session_code}&class_id=${props.class_id}&page=${current}&limit=${pageSize}`,
    )
  }

  const handleDisableRow = (record: DataType) => {
    record.disabled = true
  }

  return (
    <Table
      pagination={{
        position: ['bottomCenter'],
        defaultCurrent: 1,
        defaultPageSize: 10,
        pageSizeOptions: [10, 20],
        showSizeChanger: true,
        current: props.data && props.data.page,
        total: props.data && props.data.total,
      }}
      columns={columns}
      dataSource={data}
      scroll={{ y: 340 }}
      bordered
      size='small'
      style={{ padding: '0 16px' }}
      rowKey={(_record) => _record._id}
      onChange={onChange}
    />
  )
}

export default DetailPerSessionTable
