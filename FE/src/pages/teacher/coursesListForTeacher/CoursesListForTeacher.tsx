import React, { useState } from 'react'
import { Input } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import Header from '@/layouts/user/Header'
import Footer from '@/layouts/user/Footer'
import SidebarTeacher from '@/layouts/user/SidebarTeacher'
import ClassListTable from './CoursesListTable'
import { getCourseByCourseCode } from '@/apis/searchCourseByCouseCode.api'
import { getCoursesList } from '@/apis/coursesList.api'

const CoursesListForTeacher: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<{ count?: any }>({})

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 10

  const { data } = useQuery({
    queryKey: ['classes', page, limit],
    queryFn: async () => {
      const res = await getCoursesList(page, limit)
      return res.data
    },
  })

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
    <>
      <Header />
      <div className='max-w-[1280px] mx-auto py-8 grid grid-cols-7 grid-rows-auto gap-4'>
        <SidebarTeacher />
        <div
          className='col-span-6 row-span-4 bg-white dark:bg-[#1E293B] dark:border-none rounded-lg border-[1px] border-solid border-gray-200 overflow-hidden'
          style={{ boxShadow: '0 0 10px rgba(0,0,0,.18)', cursor: 'pointer', border: '1px solid rgba(0,0,0,.1)' }}
        >
          <div className='p-4 flex justify-between items-start'>
            <div>
              <span className='text-xl text-[#F56A00] font-bold'>Courses List For Teacher</span>
              <p className='m-0 text-sm text-gray-500 mt-2'>
                Total courses:{' '}
                <span className='text-blue-600'>{data && (searchText ? filteredData.count : data.total)}</span>
              </p>
            </div>

            <Input.Search
              placeholder='Search Course Code ...'
              style={{ width: 280 }}
              onChange={handleChange}
              onSearch={handleSearch}
            />
          </div>
          <ClassListTable
            data={data as any}
            searchText={searchText}
            setSearchParams={setSearchParams}
            filteredData={filteredData as any}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CoursesListForTeacher
