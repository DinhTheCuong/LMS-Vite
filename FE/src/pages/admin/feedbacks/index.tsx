import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Input, Card, Typography, Avatar, List, message } from 'antd'
import VirtualList from 'rc-virtual-list'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { MdSearch } from 'react-icons/md'
import { getFeedback } from '@/apis/feedback.api'
import AdminLayout from '@/layouts/admin'
import { searchFeedback } from '@/apis/searchFeedback.api'
import { ColorModeContext } from '@/contexts/colorMode'

interface UserItem {
  email: string
  gender: string
  name: {
    first: string
    last: string
    title: string
  }
  nat: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
}

type FeedbackList = {
  data: { count: number; data: []; page: number; statusCode: number; total: number; total_page: number }
  searchText: string
  setSearchParams: any
  avatar: string
  username: string
  rate: number
  content: string
  filteredData: { data: [] }
}

// const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo'
const ContainerHeight = 400

const CustomContent = () => {
  const { mode } = useContext(ColorModeContext)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState<UserItem[]>([])

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const feedbackData = useQuery({
    queryKey: [page, limit],
    queryFn: async () => {
      const res = await getFeedback(page, limit)
      return res.data
    },
  }).data

  const appendData = () => {
    if (feedbackData) {
      setData(data.concat(feedbackData.data))
      message.success(`${feedbackData.data.length} more items loaded!`)
    }
  }

  useQuery({
    queryKey: ['search', searchText],
    queryFn: async () => {
      const res = await searchFeedback(String(searchText).toUpperCase())
      setFilteredData(res.data)
    },
  }).data

  useEffect(() => {
    appendData()
  }, [])

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData()
    }
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <Link to='/admin'>Home</Link>,
          },
          {
            title: 'Feedback',
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        <div className='flex justify-between'>
          <Typography.Title
            level={3}
            className='mt-0 mx-1'
          >
            Feedback Management
          </Typography.Title>
          <Input.Search
            placeholder='Search Student Name ...'
            style={{ width: 280 }}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            allowClear
            enterButton={
              <MdSearch className={`text-${mode === 'light' ? 'black' : 'white'} align-middle text-[24px]`} />
            }
            size='large'
          />
        </div>
        {feedbackData && (
          <Card style={{ marginTop: '16px' }}>
            <List>
              <VirtualList
                data={feedbackData.data}
                height={600}
                itemHeight={47}
                itemKey='username'
                onScroll={onScroll}
              >
                {(item: FeedbackList) => (
                  <List.Item key={item.username}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.username}
                      description={item.content}
                    />
                    <div>Content</div>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Card>
        )}
      </Card>
    </div>
  )
}

const AdminFeedbacks: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminFeedbacks
