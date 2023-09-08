import { Button, Form, Select, Typography } from 'antd'
import React from 'react'

interface Props {
  data: any
  setYear: (year: string) => void
}

const HeaderDashBoard: React.FC<Props> = (props) => {
  const { data, setYear } = props
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <Typography.Title
        level={2}
        className='mt-0 mx-1'
        style={{ marginBlock: 0 }}
      >
        Dashboard
      </Typography.Title>
      <Form
        layout='horizontal'
        style={{ maxWidth: 600 }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Form.Item noStyle>
            <Select
              placeholder='Select year'
              style={{ width: '180px' }}
              onChange={(val) => setYear(val)}
            >
              {data.map((value: any) => (
                <Select.Option
                  value={value.year}
                  key={value.year}
                >
                  {value.year}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            </Form.Item> */}
        </div>
      </Form>
    </div>
  )
}
export default HeaderDashBoard
