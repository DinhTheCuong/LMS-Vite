import React, { useState } from 'react'
import Chart from '@/components/chart/Chart'
import Donut from '@/components/chart/Donut'
import CardItem from '@/components/dashboard/Card'
import AdminLayout from '@/layouts/admin'
import HeaderDashBoard from '@/components/dashboard/Header'
import Rating from '@/components/chart/Rating'
import { data } from '@/data/data'

const Statistics = () => {
  const [year, setYear] = useState('2021')
  const filterData = data.find((e) => e.year === year)?.data
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
        // padding:'30px'
      }}
    >
      <HeaderDashBoard
        data={data}
        setYear={setYear}
      />
      <CardItem
        sale={filterData?.sale}
        mentor={filterData?.mentor}
        student={filterData?.student}
        course={filterData?.course}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <Chart data={filterData?.earning} />
        <Rating data={filterData?.rating} />
        <Donut data={filterData?.traffic} />
      </div>
    </div>
  )
}

const AdminStatistics: React.FC = () => {
  return <AdminLayout content={<Statistics />} />
}

export default AdminStatistics
