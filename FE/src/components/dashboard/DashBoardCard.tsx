import React from 'react'
import { Card, Space } from 'antd'

interface Props {
  title: string
  content: string
  icon: React.ReactNode
}

const DashBoardCard = ({ title, content, icon }: Props) => {
  return (
    <Card
      title={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {title} {icon}
        </div>
      }
      style={{
        width: 250,
        border: '1px solid rgb(112,128,144, 0.1)',
        borderRadius: '8px',
      }}
    >
      <div style={{ fontSize: '25px' }}>{content}</div>
    </Card>
  )
}

export default DashBoardCard
