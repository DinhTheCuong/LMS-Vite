import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Tag, TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  _id: string
  class_code?: string
  course: { title: string; course_code: string }
  workplace: { workplace_code?: string }
  schedule: []
  class_size: number
  status: string
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
      title: 'Class Code',
      dataIndex: 'class_code',
      render: (_, { class_code }) => <>{class_code || ''}</>,
      filteredValue: [props.searchText],
      onFilter: (value, { class_code }) => String(class_code).toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      render: (_, { course }) => <>{course && course.course_code}</>,
      // filters: [
      //   {
      //     text: 'C4E',
      //     value: 'c4e',
      //   },
      //   {
      //     text: 'WEB',
      //     value: 'web',
      //   },
      //   {
      //     text: 'UI/UX',
      //     value: 'Code',
      //   },
      // ],
      // onFilter: (value, { course }) => String(course).toLowerCase() === String(value).toLowerCase(),
    },
    {
      title: 'Workplace',
      dataIndex: 'workplace',
      render: (_, { workplace }) => <>{workplace && workplace.workplace_code}</>,
      // filters: [
      //   {
      //     text: 'hdt',
      //     value: 'hdt',
      //   },
      //   {
      //     text: 'Unknown',
      //     value: 'undefined',
      //   },
      // ],
      // onFilter: (value, { workplace }) =>
      //   String(workplace.workplace_code).toLowerCase() === String(value).toLowerCase(),
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      render: (_, { schedule }) => (
        <>
          {schedule
            ? [...schedule].map((ele) => {
                if (ele === 0) {
                  return (
                    <Tag
                      color='yellow'
                      key='active'
                    >
                      Mon
                    </Tag>
                  )
                }
                if (ele === 1) {
                  return (
                    <Tag
                      color='pink'
                      key='active'
                    >
                      Tue
                    </Tag>
                  )
                }
                if (ele === 2) {
                  return (
                    <Tag
                      color='green'
                      key='active'
                    >
                      Wed
                    </Tag>
                  )
                }
                if (ele === 3) {
                  return (
                    <Tag
                      color='orange'
                      key='active'
                    >
                      Thu
                    </Tag>
                  )
                }
                if (ele === 4) {
                  return (
                    <Tag
                      color='blue'
                      key='active'
                    >
                      Fri
                    </Tag>
                  )
                }
                if (ele === 5) {
                  return (
                    <Tag
                      color='purple'
                      key='active'
                    >
                      Sat
                    </Tag>
                  )
                }
                if (ele === 6) {
                  return (
                    <Tag
                      color='red'
                      key='active'
                    >
                      Sun
                    </Tag>
                  )
                }
              })
            : ''}
        </>
      ),
    },
    {
      title: 'Total Students',
      dataIndex: 'class_size',
      sorter: (a, b) => a.class_size - b.class_size,
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {(status === 'ACTIVE' && (
            <Tag
              color='green'
              key='active'
            >
              {status.toUpperCase()}
            </Tag>
          )) ||
            (status === 'INACTIVE' && (
              <Tag
                color='volcano'
                key='inactive'
              >
                {status.toUpperCase()}
              </Tag>
            )) || (
              <Tag
                color='geekblue'
                key='active'
              >
                {String('NO STATUS').toUpperCase()}
              </Tag>
            )}
        </>
      ),
      // filters: [
      //   {
      //     text: 'ACTIVE',
      //     value: 'active',
      //   },
      //   {
      //     text: 'INACTIVE',
      //     value: 'inactive',
      //   },
      //   {
      //     text: 'NO STATUS',
      //     value: 'undefined',
      //   },
      // ],
      // onFilter: (value, { status }) => String(status).toLowerCase() === String(value).toLowerCase(),
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
    navigate(`/teacher/classes-list?page=${current}&limit=${pageSize}`)
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
            navigate(`/teacher/class-detail?id=${_id}&page=1&limit=10`)
          },
        }
      }}
    />
  )
}

export default ClassListTable
