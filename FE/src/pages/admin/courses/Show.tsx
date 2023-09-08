import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Card, Typography, Row, Col, Image, Divider, Space, Button, Tag, Rate } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { MdStarOutline } from 'react-icons/md'
import AdminLayout from '@/layouts/admin'
import { ShowButtonStyle } from '@/utils/style'
import { getCourse } from '@/apis/course.api'
import LevelTag from '@/components/tag/LevelTag'
import AdminLessonList from '../lessons/List'

const CustomContent = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: course } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await getCourse(id as string)
      return res.data.data
    },
  })

  if (!course) {
    return <Typography.Text>Course not found</Typography.Text>
  }

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <Link to='/admin'>Home</Link>,
          },
          {
            title: <Link to='/admin/courses/all'>Courses</Link>,
          },
          {
            title: `${course.course_code}: ${course.title}`,
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Typography.Title
              level={3}
              className='mt-0 mx-1'
            >
              {course.course_code}: {course.title}
            </Typography.Title>
            <Card>
              <Space direction='vertical'>
                <Typography.Text
                  className='mt-2 mx-1'
                  style={{ fontSize: '18px' }}
                >
                  Price:{' '}
                  {course.discount ? (
                    <Typography.Text
                      className='mt-2 mx-1 line-through'
                      style={{ fontSize: '18px' }}
                    >
                      {course.price} $
                    </Typography.Text>
                  ) : (
                    <Typography.Text
                      className='mt-2 mx-1'
                      style={{ fontSize: '18px' }}
                    >
                      {course.price} $
                    </Typography.Text>
                  )}{' '}
                  {course.discount > 0 && (
                    <>
                      <Typography.Text
                        strong
                        className='mt-2 mx-1'
                        style={{ fontSize: '22px' }}
                      >
                        {Math.round((1 - course.discount / 100) * course.price)} $
                      </Typography.Text>
                      <Tag
                        color='blue'
                        style={{ fontSize: '16px', padding: '4px', margin: '0 4px' }}
                      >
                        - {course.discount} %
                      </Tag>
                    </>
                  )}
                </Typography.Text>
                <Typography.Text
                  className='mt-2 mx-1'
                  style={{ fontSize: '18px' }}
                >
                  Level:{' '}
                  <LevelTag
                    level={course.level}
                    style={{ fontSize: '16px', padding: '4px 8px', margin: '0px 8px' }}
                  />
                </Typography.Text>
                <Typography.Text
                  className='mt-2 mx-1'
                  style={{ fontSize: '18px' }}
                >
                  Sessions per course: {course.session_per_course}
                </Typography.Text>
                <Rate
                  disabled
                  character={<MdStarOutline className='text-[24px]' />}
                  value={course.rate}
                />
                {/* <Typography.Text
                  className='mt-2 mx-1'
                  style={{ fontSize: '18px' }}
                >
                  Sessions per course: {course.session_per_course}
                </Typography.Text> */}
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Image
              src={course.image && course.image.length > 0 ? course.image : 'https://via.placeholder.com/500x250'}
              alt={course.title}
            />
          </Col>
          {/* <Divider /> */}
          {/* <Col span={24}>
            <Space direction='vertical'>
              <Typography.Title
                level={4}
                className='-mt-1'
              >
                Description
              </Typography.Title>
              <Typography.Text>{course.desc}</Typography.Text>
            </Space>
          </Col>
          <Divider />
          <Col span={24}>
            <Space direction='vertical'>
              <Typography.Title
                level={4}
                className='-mt-1'
              >
                Lesson List
              </Typography.Title>
              {/* <Typography.Text>{course.desc}</Typography.Text> 
            </Space>
          </Col> */}
          <AdminLessonList />
        </Row>
        <Space
          size='middle'
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}
        >
          <Button
            type='default'
            style={ShowButtonStyle}
            onClick={() => navigate('/admin/courses/all')}
          >
            Back
          </Button>
          <Button
            type='primary'
            style={ShowButtonStyle}
            onClick={() => navigate(`/admin/courses/edit/${id}`)}
          >
            Edit
          </Button>
        </Space>
      </Card>
    </>
  )
}

const AdminShowCourses: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminShowCourses
