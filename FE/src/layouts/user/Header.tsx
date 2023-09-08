import { Link } from 'react-router-dom'
import Logo from '@/assets/images/logo/logo-with-shadow.png'
import SearchBar from '@/components/search/SearchBar'
import DarkMode from './DarkMode'
import UserDropDownDefault from '@/components/dropdown/UserDropdownDefault'
import UserDropdownLogged from '@/components/dropdown/UserDropdownLogged'
import UserDropdownAdmin from '@/components/dropdown/UserDropdownAdmin'
import UserDropdownMentor from '@/components/dropdown/UserDropdownMentor'
import HiddenDropdown from '@/components/dropdown/HiddenDropdown'

const Header: React.FC = () => {
  const USER = JSON.parse(localStorage.getItem('user') as string)

  return (
    <header className='h-[56px] bg-white dark:bg-[#1E293B] flex items-center justify-between border-0 border-b-[1px] border-gray-300 border-solid dark:border-none'>
      <nav className='max-w-[1280px] mx-auto w-full flex items-center justify-between px-8'>
        <div className='flex flex-1'>
          <a
            href='/'
            className='-m-1.5 p-1.5 flex items-center no-underline'
          >
            <img
              className='h-12 w-auto'
              src={Logo}
              alt=''
            />
            <span className='text-2xl font-bold text-gray-600 dark:text-gray-100 max-lg:text-[20px] max-sm:hidden'>
              Vite Education
            </span>
          </a>
        </div>

        <div className='flex flex-1 justify-between max-md:hidden'>
          <Link
            to='/'
            className='text-lg max-lg:text-[14px] font-bold no-underline text-gray-600 dark:text-gray-100'
          >
            Home
          </Link>
          <a
            target='_blank'
            className='text-lg max-lg:text-[14px] font-bold no-underline text-gray-600 dark:text-gray-100'
          >
            About
          </a>
          <a
            target='_blank'
            className='text-lg max-lg:text-[14px] font-bold no-underline text-gray-600 dark:text-gray-100'
          >
            Pages
          </a>
          <Link
            to='/courses-list?page=1&limit=6'
            className='text-lg max-lg:text-[14px] font-bold no-underline text-gray-600 dark:text-gray-100'
          >
            Courses
          </Link>
        </div>

        <SearchBar />

        <div className='flex items-center flex-1 justify-end'>
          <DarkMode />
          <HiddenDropdown />
          <a
            target='_blank'
            className='flex items-center no-underline text-gray-600 dark:text-gray-100'
          >
            {!USER ? (
              <UserDropDownDefault />
            ) : USER && USER.role === 'ADMIN' ? (
              <UserDropdownAdmin
                username={USER.username}
                avatar={USER.avatar}
              />
            ) : USER && USER.role === 'MENTOR' ? (
              <UserDropdownMentor
                username={USER.username}
                avatar={USER.avatar}
              />
            ) : (
              <UserDropdownLogged
                username={USER.username}
                avatar={USER.avatar}
              />
            )}
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
