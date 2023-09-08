import React, { PropsWithChildren, useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Layout, Space, Typography, Image } from 'antd'
import { MdDarkMode, MdSunny, MdNotifications, MdOutlineMenu } from 'react-icons/md'
import Logo from '@/assets/images/logo/logo-with-shadow.png'
import { ColorModeContext } from '@/contexts/colorMode'
import AdminDropDown from '@/components/dropdown/adminDropDown'
import MenuSection from './Menu'

interface LayoutProps extends PropsWithChildren {
  content: React.ReactNode
}

const { Header, Footer, Sider, Content } = Layout
// const { Search } = Input

const AdminLayout: React.FC<LayoutProps> = ({ content }) => {
  const [collapsed, setCollapsed] = useState(false)
  const handleCollapse = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed)
  }
  const { mode, setMode } = useContext(ColorModeContext)
  // const onSearch = (value: string) => console.log(value)

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    color: mode === 'light' ? 'black' : 'white',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    paddingLeft: 0,
    backgroundColor: mode === 'light' ? '#e5e7eb' : '#374151',
  }

  const contentStyle: React.CSSProperties = {
    // textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    padding: '1rem',
  }

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    background: '#111827',
  }

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: mode === 'light' ? 'black' : 'white',
    backgroundColor: mode === 'light' ? '#e5e7eb' : '#374151',
  }

  const ButtonStyle: React.CSSProperties = {
    width: '2.5rem',
    height: '2.5rem',
    verticalAlign: 'middle',
  }

  const textStyle: React.CSSProperties = {
    fontSize: '18px',
    color: 'white',
  }

  return (
    <>
      <Helmet>
        <title>Vite Education - Admin</title>
        <meta charSet='UTF-8' />
        <link
          rel='icon'
          type='image/svg+xml'
          href='/vite.svg'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
      </Helmet>
      <Space
        direction='vertical'
        style={{ width: '100%' }}
        size={[0, 48]}
      >
        <Layout>
          <Sider
            style={siderStyle}
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            collapsedWidth={100}
            width='15%'
            className='min-h-screen'
          >
            <Typography.Link
              href='/admin'
              className='p-1.5 flex items-center justify-center'
            >
              <Image
                src={Logo}
                preview={false}
                style={{ height: '3rem' }}
              />
              <Typography.Text
                className={`font-semibold ${collapsed ? 'hidden' : ''}`}
                style={textStyle}
              >
                Vite Education
              </Typography.Text>
            </Typography.Link>
            <MenuSection />
          </Sider>
          <Layout>
            <Header style={headerStyle}>
              <Space size='middle'>
                <Button
                  type='text'
                  icon={
                    <MdOutlineMenu
                      className={`text-${mode === 'light' ? 'black' : 'white'} align-middle text-[24px]`}
                    />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
              </Space>
              <Space size='middle'>
                <Button
                  shape='circle'
                  icon={
                    mode === 'light' ? (
                      <MdDarkMode className={`text-${mode === 'light' ? 'black' : 'white'} align-middle text-[24px]`} />
                    ) : (
                      <MdSunny className={`text-${mode === 'light' ? 'black' : 'white'} align-middle text-[24px]`} />
                    )
                  }
                  style={ButtonStyle}
                  onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                />
                <Button
                  shape='circle'
                  icon={
                    <MdNotifications
                      className={`text-${mode === 'light' ? 'black' : 'white'} align-middle text-[24px]`}
                    />
                  }
                  style={ButtonStyle}
                />
                <AdminDropDown />
              </Space>
            </Header>
            <Content style={contentStyle}>{content}</Content>
            <Footer style={footerStyle}>© 2023 Drop Team. All Rights Reserved.</Footer>
          </Layout>
        </Layout>
      </Space>
    </>
  )
}

export default AdminLayout
