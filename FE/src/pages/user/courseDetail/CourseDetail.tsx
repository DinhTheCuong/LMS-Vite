import React from 'react'
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai'
import { BiBarChart } from 'react-icons/bi'
import { Tabs, Collapse, Button, message } from 'antd'
import type { TabsProps, CollapseProps } from 'antd'
import { useQuery } from '@tanstack/react-query'
import Sheft from '@/components/sheft/Sheft'
import Header from '@/layouts/user/Header'
import Footer from '@/layouts/user/Footer'
import LearnRegisterModal from './LearnRegisterModal'
import noImage from '@/assets/images/courses/no-image.png'
import { getCourse } from '@/apis/course.api'
import { getLessonsList } from '@/apis/lessonsList.api'
import { useQueryString } from '@/utils/utils'

const CourseDetail: React.FC = () => {
  const queryString: { id?: string } = useQueryString()
  const id = String(queryString.id) || '#'

  const { data } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await getCourse(id)
      return res.data.data
    },
  })

  const lessonsData = useQuery({
    queryKey: ['lessons', id],
    queryFn: async () => {
      const res = await getLessonsList(id, 1, 50)
      return res.data.data
    },
  }).data

  const itemsCollapse: CollapseProps['items'] = []

  lessonsData &&
    lessonsData.map((item: any) => {
      itemsCollapse.push({
        key: item.id,
        label: item.title,
        children: <p>{item.content}</p>,
      })
    })

  const CollapseComponent: React.FC = () => {
    return lessonsData ? (
      <Collapse
        items={itemsCollapse}
        accordion
      />
    ) : (
      ''
    )
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Description`,
      children: `${data ? data.desc : ''}`,
    },
    {
      key: '2',
      label: `Contents`,
      children: (
        <div className='pb-4'>
          <CollapseComponent />
        </div>
      ),
    },
  ]

  const user = JSON.parse(localStorage.getItem('user') as string)
  const [messageApi, contextHolder] = message.useMessage()
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'You are not logged in!',
    })
  }

  return (
    <>
      <Header />
      <>
        <div className='relative z-0 h-[360px] bg-gradient-to-r from-[#F3904F] to-[#3B4371] dark:bg-gradient-to-r dark:from-[#67B26F] dark:to-[#4ca2cd] flex items-center' />
        <div className='max-w-[1280px] mx-auto'>
          <div className='absolute top-28 w-[720px] text-white'>
            <div className='max-md:px-8'>
              <p className='text-3xl font-bold m-0'>Getting Started with {data ? data.title : ''}</p>
              <p className='text-xl'>
                {data ? data.title : ''} is the popular programming language which powers web pages and web
                applications. This course will get you started coding in {data ? data.title : ''}.
              </p>
            </div>
            <div className='flex items-center justify-between max-md:px-8'>
              <div className='flex items-center flex-1 text-white'>
                <BiBarChart className='text-[#754FFE] text-2xl mr-2' />
                {data
                  ? String(data.level)
                      .toLowerCase()
                      .replace(/\b\w/g, (x) => x.toUpperCase())
                  : ''}
              </div>
              <div className='flex items-center flex-1 text-white'>
                <AiOutlineClockCircle className='text-[#368A29] text-2xl mr-2' />
                {data ? data.session_per_course : ''} Sessions
              </div>
              <div className='flex items-center flex-1 text-white'>
                <AiOutlineUser className='text-[#444] text-2xl mr-2' />
                1200 Enrolled
              </div>
            </div>
          </div>
          <div className='absolute z-10 top-[360px] w-full max-w-[1280px] grid grid-cols-3 gap-6 max-md:top-[360px] max-md:w-[96%] max-md:mx-4'>
            <div
              className='col-span-2 bg-white rounded-lg p-4 py-0'
              style={{ boxShadow: '0 0 10px rgba(0,0,0,.18)', cursor: 'pointer', border: '1px solid rgba(0,0,0,.1)' }}
            >
              <Tabs
                defaultActiveKey='1'
                items={items}
              />
            </div>

            <div
              className='bg-white rounded-lg p-4 h-[272px]'
              style={{ boxShadow: '0 0 10px rgba(0,0,0,.18)', cursor: 'pointer', border: '1px solid rgba(0,0,0,.1)' }}
            >
              <div>
                <img
                  src={data && data.image.length ? data.image[0] : noImage}
                  className='w-full h-[212px] rounded-lg'
                  alt=''
                />
                {!user ? (
                  <>
                    {contextHolder}
                    <Button
                      size='large'
                      type='primary'
                      className='w-full mt-4'
                      onClick={error}
                    >
                      Learn
                    </Button>
                  </>
                ) : (
                  <LearnRegisterModal {...data} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[320px] mb-[96px]'>
          <Sheft title='Recommended to you' />
        </div>
      </>
      <Footer />
    </>
  )
}

export default CourseDetail
