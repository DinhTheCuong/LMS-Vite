import React, { useState } from 'react'
import './coursesList.css'
import { useQuery } from '@tanstack/react-query'
import { Select, Pagination, ConfigProvider } from 'antd'
import Sidebar from '@/layouts/user/Sidebar'
import CourseCard from '@/components/card/CourseCard'
import Header from '@/layouts/user/Header'
import Footer from '@/layouts/user/Footer'
import { getCoursesList } from '@/apis/coursesList.api'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { handleSortByForCourse } from '@/apis/sortByForCourse.api'
import { handleGetCoursesByRate } from '@/apis/coursesByRate.api'
import { handleGetCoursesByLevel } from '@/apis/coursesByLevel.api'

const CoursesList: React.FC = () => {
  const navigate = useNavigate()

  // Call API
  const [searchParams, _setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 6

  const { data } = useQuery({
    queryKey: ['courses', page, limit],
    queryFn: async () => {
      const res = await getCoursesList(page, limit)
      return res.data
    },
  })

  const onChange = (page: number, pageSize: number) => {
    navigate(`/courses-list?page=${page}&limit=${pageSize}`)
  }

  // Sort by
  const [sortByValue, setSortByValue] = useState('')
  const handleSortBy = (value: string) => {
    setSortByValue(value)
  }

  const sortByData = useQuery({
    queryKey: ['sortBy', sortByValue],
    queryFn: async () => {
      const res = await handleSortByForCourse(sortByValue, 1)
      return res.data.data
    },
  }).data

  // Filter by level
  const [filterLevel, setFilterLevel] = useState('all')
  const handleFilterLevel = (event: any) => {
    setFilterLevel(event.target.value)
  }
  const filterLevelData = useQuery({
    queryKey: ['level', filterLevel],
    queryFn: async () => {
      const res = await handleGetCoursesByLevel(String(filterLevel).toUpperCase())
      return res.data.data
    },
  }).data

  // Filter by rate
  const [filterRate, setFilterRate] = useState(null)
  const handleFilterRate = (event: any) => {
    setFilterRate(event.target.value)
  }
  const filterRateData = useQuery({
    queryKey: ['rate', filterRate],
    queryFn: async () => {
      const res = await handleGetCoursesByRate(filterRate)
      return res.data.data
    },
  }).data

  // Data
  let coursesListData: any[] = []
  if (data !== undefined) {
    coursesListData = data.data
    if (sortByData) {
      coursesListData = sortByData
    } else if (filterRateData && filterRate) {
      coursesListData = filterRateData
    } else if (filterLevelData && filterLevel) {
      filterLevel === 'all' ? (coursesListData = data.data) : (coursesListData = filterLevelData)
    }
  }

  return (
    <>
      <Header />
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              colorText: '#888',
              itemActiveBg: 'transparent',
            },
            Select: {
              colorText: '#888',
              colorBorder: '#777',
              colorBgContainer: 'trasparent',
              colorTextPlaceholder: '#888',
              colorBgSpotlight: '#888',
            },
            Radio: {
              colorBgContainer: 'transparent',
            },
          },
        }}
      >
        <div className='h-[128px] dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 bg-gradient-to-r from-[#24C6DC] to-[#514A9D] flex items-center'>
          <p className='max-w-[1280px] mx-auto text-white text-4xl font-bold m-0'>Courses List</p>
        </div>
        <div className='max-w-[1280px] mx-auto'>
          <div className='flex items-center justify-between mb-4 mt-10 max-xl:px-8'>
            <p className='text-gray-500'>
              Displaying <span className='text-blue-500 font-bold'>{data ? data.count : ''}</span> out of{' '}
              <span className='text-blue-500 font-bold'> {data ? data.total : ''}</span> courses
            </p>
            <Select
              placeholder='Sort by'
              style={{ width: 120 }}
              onChange={handleSortBy}
              options={[
                { value: 'create_at', label: 'Newest' },
                { value: 'course_code', label: 'Course Code' },
                { value: 'price', label: 'Price' },
              ]}
            />
          </div>
        </div>
        <div className='max-w-[1280px] mx-auto mb-[96px] grid grid-rows-1 grid-cols-4 gap-6 max-xl:px-8 max-xl:grid-cols-1'>
          <div className='row-span-1 max-xl:hidden'>
            <Sidebar
              handleFilterLevel={handleFilterLevel}
              handleFilterRate={handleFilterRate}
            />
          </div>

          <div className='col-span-3 grid grid-cols-3 row-span-1 max-xl:grid-cols-1'>
            <div className='col-span-3 grid grid-cols-3 gap-6 max-xl:col-span-2 max-xl:grid-cols-2 max-xl:flex max-xl:flex-wrap max-xl:justify-evenly'>
              {coursesListData.map((course: any) => (
                <CourseCard
                  {...course}
                  key={course._id}
                />
              ))}
            </div>
            <div className='flex justify-center col-start-2 mt-10 max-xl:col-start-1'>
              <Pagination
                defaultCurrent={1}
                defaultPageSize={6}
                pageSizeOptions={[6, 9]}
                showSizeChanger
                current={data && data.page}
                total={data && data.total}
                onChange={(page, pageSize) => onChange(page, pageSize)}
              />
            </div>
          </div>
        </div>
      </ConfigProvider>
      <Footer />
    </>
  )
}

export default CoursesList
