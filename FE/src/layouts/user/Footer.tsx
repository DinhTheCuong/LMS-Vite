const Footer = () => {
  return (
    <div className='max-w-[1280px] mx-auto mt-0 max-xl:px-8 flex items-center justify-between border-0 border-t-[1px] border-gray-300 dark:border-[#334155] border-solid py-4'>
      <div className='text-sm dark:text-gray-300 max-sm:text-xs'>© 2023 Drop Team. All Rights Reserved.</div>
      <div>
        <a
          className='no-underline text-sm mr-8 text-gray-600 dark:text-gray-400 max-sm:text-xs'
          target='_blank'
        >
          Privacy
        </a>
        <a
          className='no-underline text-sm mr-8 text-gray-600 dark:text-gray-400 max-sm:text-xs'
          target='_blank'
        >
          Terms
        </a>
        <a
          className='no-underline text-sm mr-8 text-gray-600 dark:text-gray-400 max-sm:text-xs'
          target='_blank'
        >
          Feedback
        </a>
        <a
          className='no-underline text-sm text-gray-600 dark:text-gray-400 max-sm:text-xs'
          target='_blank'
        >
          Support
        </a>
      </div>
    </div>
  )
}

export default Footer
