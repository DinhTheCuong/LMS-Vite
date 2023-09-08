import React from 'react'
import { Tag } from 'antd'
import { COMMON_LEVEL } from '@/utils/level'

const tagStyle: React.CSSProperties = {
  paddingLeft: 4,
  paddingRight: 4,
  paddingTop: 2,
  paddingBottom: 2,
  border: '1px solid',
}

interface IProps {
  level: COMMON_LEVEL
  style?: React.CSSProperties
}

const LevelTag = ({ level, style }: IProps) => {
  let color
  let label

  switch (level) {
    case COMMON_LEVEL.BEGINNER:
      color = 'green'
      label = 'BEGINNER'
      break
    case COMMON_LEVEL.INTERMEDIATE:
      color = 'yellow'
      label = 'INTERMEDIATE'
      break
    case COMMON_LEVEL.ADVANCED:
      color = 'red'
      label = 'ADVANCED'
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

export default LevelTag
