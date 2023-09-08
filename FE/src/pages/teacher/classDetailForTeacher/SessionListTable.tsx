import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Tag, TableProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  _id: string
  key: number
  session_code: string
  status: string
  desc: string
  class: { class_code: string }
}

type SessionsList = {
  data: { count: number; data: []; page: number; statusCode: number; total: number; total_page: number }
  searchText: string
  setSearchParams: any
  classId: string
  filteredData: { data: []; count: number }
}

const SessionListTable: React.FC<SessionsList> = (props) => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'index',
      width: '48px',
      render: (_value, _record, index) => <>{index + 1}</>,
    },
    {
      title: 'Session Code',
      dataIndex: 'session_code',
      width: '160px',
      filteredValue: [props.searchText],
      onFilter: (value, { session_code }) => String(session_code).toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: 'Description',
      dataIndex: 'desc',
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'status',
      width: '160px',
      render: (_, { status }) => (
        <>
          {(status === 'completed' && (
            <Tag
              color='green'
              key='active'
            >
              {status.toUpperCase()}
            </Tag>
          )) ||
            (status === 'completed' && (
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
      filters: [
        {
          text: 'COMPLETED',
          value: 'completed',
        },
        {
          text: 'UNCOMPLETED',
          value: 'uncompleted',
        },
      ],
      onFilter: (value, { status }) => String(status).indexOf(String(value)) === 0,
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
    navigate(`/teacher/class-detail?id=${props.classId}&page=${current}&limit=${pageSize}`)
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
      style={{ padding: '0 16px' }}
      onChange={onChange}
      onRow={({ _id, session_code }) => {
        return {
          onClick: () => {
            navigate(
              `/teacher/class-detail/session?session_code=${session_code}&session_id=${_id}&class_id=${props.classId}&page=1&limit=10`,
            )
          },
        }
      }}
    />
  )
}

export default SessionListTable
