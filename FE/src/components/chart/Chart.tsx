import React from 'react'
import { Column } from '@ant-design/plots'
import { Card } from 'antd'

interface Props {
  data: any
}

const Chart: React.FC<Props> = (props) => {
  const { data } = props
  const config = {
    data,
    width: 300,
    height: 200,
    xField: 'month',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  }
  return (
    <Card title='Earning'>
      <Column {...config} />
    </Card>
  )
}
export default Chart
