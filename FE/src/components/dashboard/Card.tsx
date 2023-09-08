import React from 'react'
import { Space } from 'antd'
import { GoBook } from 'react-icons/go'
import { MdOutlineAttachMoney, MdOutlinePeople } from 'react-icons/md'
import DashBoardCard from './DashBoardCard'

const CardItem = ({ sale, course, student, mentor }) => (
  <Space direction='horizontal'>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <DashBoardCard
        title='Sale'
        content={sale}
        icon={
          <MdOutlineAttachMoney
            size={23}
            color='#8854C0'
          />
        }
      />
      <DashBoardCard
        title='Course'
        content={course}
        icon={
          <GoBook
            size={23}
            color='#8854C0'
          />
        }
      />
      <DashBoardCard
        title='Student'
        content={student}
        icon={
          <MdOutlinePeople
            size={23}
            color='#8854C0'
          />
        }
      />
      <DashBoardCard
        title='Mentor'
        content={mentor}
        icon={
          <MdOutlinePeople
            size={23}
            color='#8854C0'
          />
        }
      />
    </div>
  </Space>
)
export default CardItem
