import React from 'react'
import './forbidden403.css'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Fobidden403: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='page_404 w-full flex flex-col items-center '>
      <h1 className='text-center text-6xl text-[#695681] m-0'>
        403 <br />
        FORBIDDEN
      </h1>

      <div className='four_zero_four_bg w-full bg-no-repeat' />

      <div className='contant_box_404 flex flex-col items-center'>
        <p>Oops! You don&#39;t have permission to access this page.</p>
        <Button
          type='primary'
          onClick={() => navigate('/', { replace: true })}
        >
          Comeback home!
        </Button>
      </div>
    </div>
  )
}

export default Fobidden403
