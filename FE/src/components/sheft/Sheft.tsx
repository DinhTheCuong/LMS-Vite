import { useQuery } from '@tanstack/react-query'
import CourseCard from '../card/CourseCard'
import { getCoursesList } from '@/apis/coursesList.api'
import { useQueryString } from '@/utils/utils'

interface SheftProps {
  title: string
}

const Sheft: React.FC<SheftProps> = ({ title }) => {
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1

  const { data } = useQuery({
    queryKey: ['courses', page],
    queryFn: async () => {
      const res = await getCoursesList(page, 4)
      return res.data.data
    },
  })

  return (
    <div className='max-w-[1280px] mx-auto max-xl:px-8'>
      <p className='text-2xl font-bold m-0 mt-[96px] mb-[30px] dark:text-gray-100'>{title}</p>
      <div className='grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-lg:flex max-lg:flex-wrap max-lg:justify-evenly max-xl:grid-cols-3'>
        {data
          ? data.map((course: any) => (
              <CourseCard
                {...course}
                key={course._id}
              />
            ))
          : ''}
      </div>
    </div>
  )
}

export default Sheft
