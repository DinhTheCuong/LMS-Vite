import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Card, Typography, Row, Col, Image, Divider, Space, Button } from 'antd'
import { useQuery } from '@tanstack/react-query'
import AdminLayout from '@/layouts/admin'
import { getWorkplace } from '@/apis/workplaceByID.api'
import { ShowButtonStyle } from '@/utils/style'
import StatusTag from '@/components/tag/StatusTag'

const CustomContent = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: workplace } = useQuery({
    queryKey: ['workplaces'],
    queryFn: async () => {
      const res = await getWorkplace(id as string)
      return res.data.data
    },
  })

  if (!workplace) {
    return <Typography.Text>Facility not found</Typography.Text>
  }

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <Link to='/admin'>Home</Link>,
          },
          {
            title: <Link to='/admin/facilities/all'>Facilities</Link>,
          },
          {
            title: `${workplace.name}`,
          },
        ]}
        style={{ padding: '4px', fontSize: '16px' }}
      />
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            {workplace && (
              <>
                <Typography.Title
                  level={3}
                  className='mt-0 mx-1'
                >
                  {workplace.name} ({workplace.workplace_code})
                </Typography.Title>
                <Typography.Paragraph
                  className='mt-2 mx-1'
                  style={{ fontSize: '18px' }}
                >
                  Location: {workplace.address}
                </Typography.Paragraph>
                <StatusTag
                  status={workplace.status}
                  style={{ fontSize: '18px', padding: '8px' }}
                />
              </>
            )}
          </Col>
          <Col span={8}>
            <Image
              src='https://res.cloudinary.com/dar4pvqx2/image/upload/v1693931926/vitebanner_wtcoum.jpg'
              alt={workplace.name}
            />
          </Col>
          <Divider />
        </Row>
        <Space
          size='middle'
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}
        >
          <Button
            type='default'
            style={ShowButtonStyle}
            onClick={() => navigate('/admin/facilities/all')}
          >
            Back
          </Button>
          <Button
            type='primary'
            style={ShowButtonStyle}
            onClick={() => navigate(`/admin/facilities/edit/${id}`)}
          >
            Edit
          </Button>
        </Space>
      </Card>
    </>
  )
}

const AdminShowFacilities: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminShowFacilities
