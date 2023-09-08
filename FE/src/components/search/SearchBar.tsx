import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useQuery } from '@tanstack/react-query'
import { getCourseByCourseCode } from '@/apis/searchCourseByCouseCode.api'
import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'

const SearchBar: React.FC = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<{ data?: any; count?: any }>({})

  type DataType = {
    _id: string
    title: string
    image: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'image',
      dataIndex: 'image',
      width: '100px',
      render: (value) => (
        <img
          src={value}
          alt=''
          className='w-20 h-12 rounded-md'
        />
      ),
    },
    {
      title: 'title',
      dataIndex: 'title',
      render: (value) => <p className='text-[14px] font-bold'>{value}</p>,
    },
  ]

  useQuery({
    queryKey: ['search', searchText],
    queryFn: async () => {
      const res = await getCourseByCourseCode(String(searchText).toUpperCase())
      setFilteredData(res.data)
    },
  }).data

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleChange = debounce((event: any) => {
    handleSearch(event.target.value)
  }, 1000)

  return (
    <div className='relative flex items-center ml-10 max-2xl:hidden'>
      <FiSearch className='absolute left-3 text-gray-400' />
      <input
        type='text'
        placeholder='Search Course ...'
        className='dark:bg-[#0B1324] rounded-md outline-none h-8 pl-10 border-[1px] border-solid border-gray-400 dark:border-[#0B1324] dark:focus:border-sky-500 dark:focus:border-solid dark:focus:border-[1px] focus:outline-none focus:border-sky-500 focus:border-[1px] dark:text-gray-100'
        onChange={handleChange}
      />

      {searchText ? (
        <div
          className='bg-white absolute top-11 z-10 w-[160%] rounded-md border-[1px] border-solid border-gray-400 py-4 px-2'
          style={{ boxShadow: '0 0 10px rgba(0,0,0,.18)', cursor: 'pointer', border: '1px solid rgba(0,0,0,.14)' }}
        >
          <Table
            columns={columns}
            dataSource={filteredData && filteredData.data}
            pagination={false}
            showHeader={false}
            scroll={{ y: 240 }}
            size='small'
            rowKey={({ _id }) => {
              return _id
            }}
            onRow={({ _id }) => {
              return {
                onClick: () => {
                  navigate(`/course-detail?id=${_id}`)
                  navigate(0)
                },
              }
            }}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default SearchBar
