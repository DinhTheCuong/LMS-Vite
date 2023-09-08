// import React from 'react'
// import { UploadOutlined } from '@ant-design/icons'
// import { Button, Form, Upload } from 'antd'

// const UploadImage: React.FC<{ imageUpload: any; setImageUpload: any }> = (props) => {
//   const { imageUpload, setImageUpload } = props
//   const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//       return e
//     }
//     return e?.fileList
//   }
//   return (
//     <Form
//       layout='vertical'
//       className='w-[320px]'
//     >
//       <Form.Item
//         name='upload'
//         label={<p className='font-bold dark:text-gray-300'>Your avatar</p>}
//         valuePropName='fileList'
//         getValueFromEvent={normFile}
//       >
//         <Upload
//           name='image'
//           listType='picture'
//           className='ml-8'
//           beforeUpload={(file) => {
//             setImageUpload([...imageUpload, file])
//           }}
//         >
//           <Button icon={<UploadOutlined />}>Click to upload!</Button>
//         </Upload>
//       </Form.Item>
//     </Form>
//   )
// }

// export default UploadImage

import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const UploadImage: React.FC<{ imageUpload: any; setImageUpload: any }> = (props) => {
  const { imageUpload, setImageUpload } = props
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const USER = JSON.parse(localStorage.getItem('user') as string)

  return (
    <>
      <Upload
        listType='picture-circle'
        onPreview={handlePreview}
        onChange={handleChange}
        defaultFileList={USER && USER.avatar ? [{ uid: 'avt', name: 'Avatar', status: 'done', url: USER.avatar }] : []}
        beforeUpload={(file) => {
          setImageUpload([...imageUpload, file])
          return false
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title='Avatar'
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt='avt'
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}

export default UploadImage
