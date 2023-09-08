import React, { useState } from 'react'
import { Input } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import Header from '@/layouts/user/Header'
import Footer from '@/layouts/user/Footer'
import SidebarTeacher from '@/layouts/user/SidebarTeacher'
import LessonsListTable from './LessonsListTable'
import { getLessonsList } from '@/apis/lessonsList.api'
import { getLessonByLessonCode } from '@/apis/searchLessonByLessonCode.api'
import { getCourse } from '@/apis/course.api'

const LessonsListForTeacher: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<{ count?: any }>({})

  const [searchParams, setSearchParams] = useSearchParams()
  const course_id = searchParams.get('course_id') ?? ''
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const { data } = useQuery({
    queryKey: ['classes', course_id, page, limit],
    queryFn: async () => {
      const res = await getLessonsList(course_id, page, limit)
      return res.data
    },
  })

  const courseData = useQuery({
    queryKey: ['course', course_id],
    queryFn: async () => {
      const res = await getCourse(course_id)
      return res.data.data
    },
  }).data

  console.log(courseData)

  useQuery({
    queryKey: ['search', searchText],
    queryFn: async () => {
      const res = await getLessonByLessonCode(String(searchText).toUpperCase())
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
              <span className='text-xl text-[#F56A00] font-bold'>Lessons List For Teacher</span>
              <p className='m-0 text-sm text-gray-500 mt-2'>
                Course: <span className='text-blue-600'>{courseData && courseData.course_code}</span>
              </p>
              <p className='m-0 text-sm text-gray-500 mt-2'>
                Total lessons:{' '}
                <span className='text-blue-600'>{searchText ? filteredData.count : data ? data.total : 0}</span>
              </p>
            </div>
            <Input.Search
              placeholder='Search Lesson Name ...'
              style={{ width: 280 }}
              onChange={handleChange}
              onSearch={handleChange}
            />
          </div>
          <LessonsListTable
            data={data as any}
            searchText={searchText}
            setSearchParams={setSearchParams}
            filteredData={filteredData as any}
            course_id={course_id}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LessonsListForTeacher
