import { MdDarkMode, MdSunny } from 'react-icons/md'

const DarkMode: React.FC = () => {
  const sunIcon = document.querySelector('.sun')
  const moonIcon = document.querySelector('.moon')

  const userTheme = localStorage.getItem('theme')
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

  const iconToggle = () => {
    moonIcon?.classList.toggle('hidden')
    sunIcon?.classList.toggle('hidden')
  }

  const themeCheck = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      document.documentElement.classList.add('dark')
      sunIcon?.classList.remove('hidden')
      moonIcon?.classList.add('hidden')
      return
    }
    sunIcon?.classList.add('hidden')
  }

  const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      iconToggle()
      return
    }
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    iconToggle()
  }

  themeCheck()

  return (
    <div className='w-[32px] h-[32px] cursor-pointer bg-gray-200 hover:bg-gray-300 mr-10 p-0 rounded-full flex items-center justify-center  border-none focus:outline-none dark:focus:ring-gray-700'>
      <MdDarkMode
        onClick={() => themeSwitch()}
        className='moon text-2xl hover:text-gray-600 text-gray-400 dark:text-white max-md:text-gray-600'
      />
      <MdSunny
        onClick={() => themeSwitch()}
        className='sun hidden text-2xl hover:text-gray-600 text-gray-400 dark:text-gray-600'
      />
    </div>
  )
}

export default DarkMode
