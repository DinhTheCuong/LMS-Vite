import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Tag, TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  _id: string
  course_code?: string
  title: string
  level: string
  session_per_course: number
  desc: string
}

type ClassesList = {
  data: { count: number; data: []; page: number; statusCode: number; total: number; total_page: number }
  setSearchParams: any
  searchText: string
  filteredData: { data: []; count: number }
}

const ClassListTable: React.FC<ClassesList> = (props) => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'index',
      width: '48px',
      render: (_value, _record, index) => <>{index + 1}</>,
    },
    {
      title: 'Course Code',
      dataIndex: 'class_code',
      width: '140px',
      render: (_, { course_code }) => <>{course_code || ''}</>,
      filteredValue: [props.searchText],
      onFilter: (value, { course_code }) => String(course_code).toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: 'Specialize',
      dataIndex: 'title',
      width: '180px',
      render: (_, { title }) => <div className='whitespace-nowrap overflow-hidden text-ellipsis '>{title}</div>,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      width: '140px',
      render: (_, { level }) => (
        <>
          {(level === 'BEGINNER' && (
            <Tag
              color='geekblue'
              key='BEGINER'
            >
              {level.toUpperCase()}
            </Tag>
          )) ||
            (level === 'INTERMEDIATE' && (
              <Tag
                color='green'
                key='INTERMEDIATE'
              >
                {level.toUpperCase()}
              </Tag>
            )) ||
            (level === 'ADVANCED' && (
              <Tag
                color='volcano'
                key='ADVANCED'
              >
                {level.toUpperCase()}
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: 'Total Sessions',
      dataIndex: 'session_per_course',
      width: '120px',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      render: (_, { desc }) => <div className='whitespace-nowrap overflow-hidden text-ellipsis '>{desc}</div>,
    },
  ]

  let data: DataType[] = []

  const navigate = useNavigate()
  if (props.data !== undefined) {
    data = props.searchText ? props.filteredData.data : props.data.data
  }

  const onChange: TableProps<DataType>['onChange'] = (pagination, _filters, _sorter, _extra) => {
    const { current, pageSize } = pagination
    props.setSearchParams(current)
    navigate(`/teacher/courses-list?page=${current}&limit=${pageSize}`)
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
        total: props.data && (props.searchText ? props.filteredData.count : props.data.total),
      }}
      columns={columns}
      dataSource={data}
      scroll={{ y: 340 }}
      bordered
      size='small'
      rowKey={({ _id }) => {
        return _id
      }}
      style={{ padding: '0 16px' }}
      onChange={onChange}
      onRow={({ _id }) => {
        return {
          onClick: () => {
            navigate(`/teacher/lessons-list?course_id=${_id}&page=1&limit=10`)
          },
        }
      }}
    />
  )
}

export default ClassListTable
