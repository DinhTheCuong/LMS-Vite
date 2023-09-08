import React from 'react'
import { Routes, Route } from 'react-router-dom'

// USER
import ScrollToTop from './layouts/scrollToTop.ts'
import Home from './pages/user/home/Home'
import CoursesList from './pages/user/cousesList/CoursesList'
import CourseDetail from './pages/user/courseDetail/CourseDetail'
import Register from './pages/user/register/Register.tsx'
import Login from './pages/user/login/Login.tsx'
import ForgotPassword from './pages/user/forgotPassword/ForgotPassword.tsx'
import NotFound404 from './pages/notFound404/NotFound404.tsx'
import SendMailDone from './pages/user/forgotPassword/SendMailDone.tsx'
import EditProfile from './pages/user/editProfile/EditProfile.tsx'
import ResetPassword from './pages/user/resetPassword/ResetPassword.tsx'
import DetailPerSession from './pages/teacher/classDetailForTeacher/DetailPerSession.tsx'
import ChangePassword from './pages/user/changePassword/ChangePassword.tsx'

// TEACHER
import ClassesListForTeacher from './pages/teacher/classesListForTeacher/ClassesListForTeacher.tsx'
import SessionListForTeacher from './pages/teacher/classDetailForTeacher/SessionListForTeacher.tsx'
import LessonsListForTeacher from './pages/teacher/lessonsListForTeacher/LessonsListForTeacher.tsx'
import CoursesListForTeacher from './pages/teacher/coursesListForTeacher/CoursesListForTeacher.tsx'

// ADMIN
import AdminHome from './pages/admin/home/index'
import AdminListFacilities from './pages/admin/facilities/List.tsx'
import AdminShowFacilities from './pages/admin/facilities/Show.tsx'
import AdminCreateFacilities from './pages/admin/facilities/Create.tsx'
import AdminListCourses from './pages/admin/courses/List.tsx'
import AdminShowCourses from './pages/admin/courses/Show.tsx'
import AdminCreateCourses from './pages/admin/courses/Create.tsx'
import AdminEditCourses from './pages/admin/courses/Edit.tsx'
import AdminEditFacilities from './pages/admin/facilities/Edit.tsx'
import AdminListClasses from './pages/admin/classes/List.tsx'
import AdminShowClasses from './pages/admin/classes/Show.tsx'
import AdminCreateClasses from './pages/admin/classes/Create.tsx'
import AdminEditClasses from './pages/admin/classes/Edit.tsx'
import AdminMentors from './pages/admin/userlists/MentorList.tsx'
import AdminStudents from './pages/admin/userlists/StudentList.tsx'
import AdminLessons from './pages/admin/lessons/Edit.tsx'
import AdminFeedbacks from './pages/admin/feedbacks/index.tsx'
import AdminStudentEdit from './pages/admin/userlists/StudentEdit.tsx'
import AdminMentorEdit from './pages/admin/userlists/MentorEdit.tsx'
import Forbidden403 from './pages/forbidden403/Fobidden403.tsx'
import LoginForm from './pages/user/login/LoginForm.tsx'
import AdminRegisterCourse from './pages/admin/registercourses/index.tsx'

const App: React.FC = () => {
  const USER = JSON.parse(localStorage.getItem('user') as string)
  return (
    <>
      <Routes>
        {/* USER */}
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/courses-list'
          element={<CoursesList />}
        />
        <Route
          path='/course-detail'
          element={<CourseDetail />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/edit-profile'
          element={USER ? <EditProfile /> : <LoginForm />}
        />
        <Route
          path='/change-password'
          element={USER ? <ChangePassword /> : <NotFound404 />}
        />
        <Route
          path='/forgot-password'
          element={<ForgotPassword />}
        />
        <Route
          path='/forgot-password/send-mail'
          element={<SendMailDone />}
        />
        <Route
          path='/reset-password'
          element={<ResetPassword />}
        />
        <Route
          path='/profile'
          element={USER ? <EditProfile /> : <LoginForm />}
        />
        <Route
          path='/change-password'
          element={USER ? <ChangePassword /> : <LoginForm />}
        />

        {/* TEACHER */}
        <Route
          path='/teacher/classes-list'
          element={USER && (USER.role === 'MENTOR' || 'ADMIN') ? <ClassesListForTeacher /> : <Forbidden403 />}
        />
        <Route
          path='/teacher/class-detail'
          element={USER && (USER.role === 'MENTOR' || 'ADMIN') ? <SessionListForTeacher /> : <Forbidden403 />}
        />
        <Route
          path='/teacher/lessons-list'
          element={USER && (USER.role === 'MENTOR' || 'ADMIN') ? <LessonsListForTeacher /> : <Forbidden403 />}
        />
        <Route
          path='/teacher/class-detail/session'
          element={USER && (USER.role === 'MENTOR' || 'ADMIN') ? <DetailPerSession /> : <Forbidden403 />}
        />
        <Route
          path='/teacher/courses-list'
          element={USER && (USER.role === 'MENTOR' || 'ADMIN') ? <CoursesListForTeacher /> : <Forbidden403 />}
        />

        {/* ADMIN */}
        <Route
          path='/admin'
          // element={<AdminHome />}
          element={USER && USER.role === 'ADMIN' ? <AdminHome /> : <Forbidden403 />}
        />
        <Route
          path='/admin/facilities/all'
          element={USER && USER.role === 'ADMIN' ? <AdminListFacilities /> : <Forbidden403 />}
        />
        <Route
          path='/admin/facilities/show/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminShowFacilities /> : <Forbidden403 />}
        />
        <Route
          path='/admin/facilities/edit/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminEditFacilities /> : <Forbidden403 />}
        />
        <Route
          path='/admin/facilities/create'
          element={USER && USER.role === 'ADMIN' ? <AdminCreateFacilities /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/categories'
          element={USER && USER.role === 'ADMIN' ? <AdminListCourses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/categories/show/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminShowCourses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/categories'
          element={USER && USER.role === 'ADMIN' ? <AdminListCourses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/categories/create'
          element={USER && USER.role === 'ADMIN' ? <AdminCreateCourses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/all'
          element={USER && USER.role === 'ADMIN' ? <AdminListCourses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/show/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminShowCourses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/create'
          element={USER && USER.role === 'ADMIN' ? <AdminCreateCourses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/edit/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminEditCourses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/show/:id/lessons'
          element={USER && USER.role === 'ADMIN' ? <AdminLessons /> : <Forbidden403 />}
        />
        <Route
          path='/admin/classes/all'
          element={USER && USER.role === 'ADMIN' ? <AdminListClasses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/classes/show/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminShowClasses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/classes/create'
          element={USER && USER.role === 'ADMIN' ? <AdminCreateClasses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/classes/edit/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminEditClasses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/users/mentors'
          element={USER && USER.role === 'ADMIN' ? <AdminMentors /> : <Forbidden403 />}
        />
        <Route
          path='/admin/users/students'
          element={USER && USER.role === 'ADMIN' ? <AdminStudents /> : <Forbidden403 />}
        />
        <Route
          path='/admin/users/mentors/edit/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminMentorEdit /> : <Forbidden403 />}
        />
        <Route
          path='/admin/users/students/edit/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminStudentEdit /> : <Forbidden403 />}
        />
        <Route
          path='/admin/classes/create'
          element={USER && USER.role === 'ADMIN' ? <AdminCreateClasses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/classes/edit/:id'
          element={USER && USER.role === 'ADMIN' ? <AdminEditClasses /> : <Forbidden403 />}
        />
        <Route
          path='/admin/feedbacks'
          element={USER && USER.role === 'ADMIN' ? <AdminFeedbacks /> : <Forbidden403 />}
        />
        <Route
          path='/admin/courses/register-course'
          element={USER && USER.role === 'ADMIN' ? <AdminRegisterCourse /> : <Forbidden403 />}
        />
        {/* <Route
          path='/admin/profile'
          element={USER && USER.role === 'ADMIN' ? <AdminProfile /> : <Forbidden403 />}
        />
        <Route
          path='/admin/change-password'
          element={USER && USER.role === 'ADMIN' ? <AdminChangePassword /> : <Forbidden403 />}
        /> */}
        {/* <Route
          path='/admin'
          element={<Statistic />}
        /> */}
        <Route
          path='*'
          element={<NotFound404 />}
        />
      </Routes>
      <ScrollToTop />
    </>
  )
}

export default App
