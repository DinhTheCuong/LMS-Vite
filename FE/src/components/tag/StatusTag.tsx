import React from 'react'
import { Tag } from 'antd'
import { COMMON_STATUS } from '@/utils/status'

const tagStyle: React.CSSProperties = {
  paddingLeft: 4,
  paddingRight: 4,
  paddingTop: 2,
  paddingBottom: 2,
  border: '1px solid',
}

interface IProps {
  status: COMMON_STATUS
  style?: React.CSSProperties
}

const StatusTag = ({ status, style }: IProps) => {
  let color
  let label

  switch (status) {
    case (COMMON_STATUS.ACTIVE, COMMON_STATUS.ON):
      color = 'green'
      label = 'ACTIVE'
      break
    case COMMON_STATUS.UPCOMING:
      color = 'yellow'
      label = 'UPCOMING'
      break
    case (COMMON_STATUS.INACTIVE, COMMON_STATUS.OFF):
      color = 'red'
      label = 'INACTIVE'
      break
    default:
      break
  }

  return (
    <Tag
      color={color}
      style={{ ...tagStyle, ...style }}
    >
      {label}
    </Tag>
  )
}

export default StatusTag
