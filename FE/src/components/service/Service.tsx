import { BsCameraVideo, BsClock } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi2'

const Service: React.FC = () => {
  return (
    <div className='bg-white dark:bg-[#0B1324] py-4 shadow-md max-lg:px-8 max-lg:text-sm'>
      <div className='max-w-[1280px] mx-auto grid grid-cols-3 items-center justify-between'>
        <div className='flex items-center justify-center'>
          <div className='bg-[#FFEEDA] dark:bg-[#5A4327] w-12 h-12 max-md:text-[12px] rounded-full flex items-center justify-center mr-4'>
            <BsCameraVideo className='text-xl text-[#C28135]' />
          </div>
          <div>
            <span className='text-gray-600 dark:text-gray-100 font-bold'>30,000 Online Courses</span>
            <p className='m-0 text-sm text-gray-500 mt-1 max-md:hidden'>Enjoy a variety of fresh topics</p>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className='bg-[#FFEEDA] dark:bg-[#5A4327] w-12 h-12 max-md:text-[12px] rounded-full flex items-center justify-center mr-4'>
            <HiOutlineUserGroup className='text-2xl text-[#C28135]' />
          </div>
          <div>
            <span className='text-gray-600 dark:text-gray-100 font-bold'>Expert instruction</span>
            <p className='m-0 text-sm text-gray-500 mt-1 max-md:hidden'>Find the right instructor for you</p>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className='bg-[#FFEEDA] dark:bg-[#5A4327] w-12 h-12 max-md:text-[12px] rounded-full flex items-center justify-center mr-4'>
            <BsClock className='text-xl text-[#C28135]' />
          </div>
          <div>
            <span className='text-gray-600 dark:text-gray-100 font-bold'>Lifetime access</span>
            <p className='m-0 text-sm text-gray-500 mt-1 max-md:hidden'>Learn on your schedule</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service
