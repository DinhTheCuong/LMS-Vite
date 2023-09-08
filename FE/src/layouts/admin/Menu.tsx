import { ConfigProvider, Menu, MenuProps } from 'antd'
import {
  MdClass,
  MdMenuBook,
  MdOutlineFeedback,
  MdOutlineHome,
  MdOutlineNoteAlt,
  MdPeople,
  MdPlace,
} from 'react-icons/md'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './menu.css'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  style?: React.CSSProperties,
): MenuItem {
  return { label, key, icon, children, style } as MenuItem
}

const MenuSection: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === '' || e.key === '') {
      navigate('/admin')
    }
    if (e.key === 'courses/register-course') {
      navigate('/admin/courses/register-course')
    }
    if (e.key !== '' && e.key !== 'courses/register-course') {
      searchParams.set('page', '1')
      searchParams.set('limit', '10')
      navigate(`/admin/${e.key}?${searchParams.toString()}`, { replace: true })
    }
  }

  const items: MenuProps['items'] = [
    getItem('Home', '', <MdOutlineHome style={{ fontSize: '24px', verticalAlign: 'middle' }} />),

    getItem('Users', 'users', <MdPeople style={{ fontSize: '24px', verticalAlign: 'middle' }} />, [
      getItem('Mentors', 'users/mentors'),
      getItem('Students', 'users/students'),
    ]),

    getItem('Courses', 'courses', <MdMenuBook style={{ fontSize: '24px', verticalAlign: 'middle' }} />, [
      getItem('All Courses', 'courses/all'),
      getItem('Register Course', 'courses/register-course'),
    ]),

    getItem('Classes', 'classes/all', <MdClass style={{ fontSize: '24px', verticalAlign: 'middle' }} />),

    getItem('Facilities', 'facilities/all', <MdPlace style={{ fontSize: '24px', verticalAlign: 'middle' }} />),

    getItem('Feedbacks', 'feedbacks', <MdOutlineFeedback style={{ fontSize: '24px', verticalAlign: 'middle' }} />),

    // getItem('Analytics', 'analytics', <MdBarChart style={{ fontSize: '24px', verticalAlign: 'middle' }} />),
    // getItem('Calendar', 'calendar', <MdOutlineCalendarToday style={{ fontSize: '24px', verticalAlign: 'middle' }} />),
  ]

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: { itemColor: 'white', itemBg: '#111827', itemHoverColor: '#1677ff', colorBgElevated: '#111827' },
          },
        }}
      >
        <Menu
          onClick={onClick}
          mode='inline'
          items={items}
        />
      </ConfigProvider>
    </>
  )
}

export default MenuSection
