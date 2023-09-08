import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiBarChart, BiMessageSquareDetail } from 'react-icons/bi'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { Course } from '@/types/course.type'
import noImage from '@/assets/images/courses/no-image.png'

const CourseCard = (course: Course) => {
  const { _id, image, course_code, title, session_per_course, level, rate, price, discount } = course
  return (
    <div
      className='w-[300px] bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden '
      style={{ boxShadow: '0 0 10px rgba(0,0,0,.18)', cursor: 'pointer', border: '1px solid rgba(0,0,0,.14)' }}
    >
      <Link
        to={`/course-detail?id=${_id}`}
        className='no-underline text-gray-800 dark:text-gray-100'
      >
        <img
          src={image.length !== 0 ? image : noImage}
          alt=''
          className='w-full h-[180px]'
        />
        <div className='px-4 h-'>
          <p
            className='font-bold leading-6 h-[48px]'
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {course_code}: {title} for Everyone
          </p>
          <div className='flex items-center'>
            <div className='flex items-center flex-1 text-gray-500'>
              <AiOutlineClockCircle className='text-[#368A29] text-lg mr-2' />
              {session_per_course} Sessions
            </div>
            <div className='flex items-center flex-1 text-gray-500'>
              <BiBarChart className='text-[#754FFE] text-lg mr-2' />
              {String(level)
                .toLowerCase()
                .replace(/\b\w/g, (x) => x.toUpperCase())}
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center text-xl mr-1'>
              {rate
                ? [...Array(rate)].map(() => {
                    return (
                      <p
                        key={Math.random()}
                        className='m-0 mt-2 mr-1 text-[#F59E0B]'
                      >
                        &#9733;
                      </p>
                    )
                  })
                : [...Array(5)].map(() => {
                    return (
                      <p
                        key={Math.random()}
                        className='m-0 mt-2 mr-1 text-[#F59E0B]'
                      >
                        &#9733;
                      </p>
                    )
                  })}
            </div>
            <span className='mt-[10px] text-gray-500 text-sm'>({Math.floor(Math.random() * 1000)})</span>
          </div>
          <div className='flex items-center'>
            <p className='font-bold mr-2'>
              {Number(discount)
                ? `${'$'}${Math.floor(Number(price) * (1 - Number(discount) / 100))}`
                : `${'$'}${price}`}
            </p>
            <p className='text-gray-500 text-sm line-through'>{Number(discount) ? `${price}` : ''}</p>
          </div>
        </div>
        <div className='flex items-center justify-between border-0 border-t-[1px] border-gray-300 dark:border-[#334155] border-solid px-4'>
          <div className='flex items-center'>
            <img
              src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.floor(Math.random() * 10)}`}
              className='w-8 h-8 rounded-full mr-2 border-[1px] border-solid border-[#ccc]'
            />
            <p className='text-gray-500'>Senior Teacher</p>
          </div>
          <a target='_blank'>
            <Tooltip title='View Detail Course'>
              <BiMessageSquareDetail className='text-xl text-[#8A6AFE]' />
            </Tooltip>
          </a>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard
