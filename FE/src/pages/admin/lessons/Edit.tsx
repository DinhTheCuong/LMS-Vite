import React from 'react'
import AdminLayout from '@/layouts/admin'

const CustomContent = () => {
  return <div>CustomContent</div>
}

const AdminLessonEdit: React.FC = () => {
  return <AdminLayout content={<CustomContent />} />
}

export default AdminLessonEdit
