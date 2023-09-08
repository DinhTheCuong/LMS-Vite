import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '@/assets/images/carousel/carosel-1.jpg'

const contentStyle: React.CSSProperties = {
  height: '408px',
  backgroundImage: `url(${img1})`,
  backgroundSize: 'cover',
}

const Carousel: React.FC = () => {
  return (
    <div style={contentStyle}>
      <div className='relative max-w-[1280px] mx-auto max-xl:px-8'>
        <div className='absolute top-10'>
          <p className='text-5xl font-bold my-4 text-gray-100 max-xl:text-3xl'>
            Welcome to Vite <br />
            Education System
          </p>
          <p className='text-2xl font-bold my-2 text-gray-300 max-xl:text-xl'>
            Hand-picked Instructor and expertly crafted courses, <br /> designed for the modern students and
            entrepreneur.
          </p>
          <button className='mt-4 text-white font-bold bg-gray-800 outline-none border-none p-3 rounded-md cursor-pointer hover:bg-gray-600'>
            <Link
              to='/courses-list'
              className='no-underline'
              style={{ color: ' #e5e7eb' }}
            >
              Browse Courses
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Carousel
