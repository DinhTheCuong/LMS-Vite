// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots'
import { Card } from 'antd'

interface Props {
  data: any
}

const Donut: React.FC<Props> = (props) => {
  const { data } = props
  const config = {
    appendPadding: 10,
    data,
    width: 300,
    height: 200,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: undefined,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  }
  return (
    <Card title='Traffic'>
      <Pie {...config} />
    </Card>
  )
}

export default Donut
