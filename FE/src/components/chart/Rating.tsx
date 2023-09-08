import React from 'react'
import { Bar } from '@ant-design/plots'
import { Card } from 'antd'
// import data from '@/data/data';
interface Props {
  data: any
}
const Rating: React.FC<Props> = (props) => {
  const { data } = props
  const config = {
    data,
    width: 300,
    height: 200,
    xField: 'value',
    yField: 'rating',
    seriesField: 'rating',
    position: 'top-left',
  }
  return (
    <Card title='Rating'>
      <Bar {...config} />
    </Card>
  )
}

export default Rating
