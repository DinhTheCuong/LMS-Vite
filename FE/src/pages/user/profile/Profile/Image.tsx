// import React, { useState, useEffect, useRef } from 'react'
// import './Profile.css'
// import { AiFillCamera } from 'react-icons/ai'
// import { BiSolidUserCircle } from 'react-icons/bi'

// const Image: React.FC = () => {
//   const inputRef = useRef<HTMLInputElement | null>(null)
//   const [avatar, setAvatar] = useState(Object)
//   const [isAvatar, setIsAvatar] = useState(false)

//   useEffect(() => {
//     return () => {
//       avatar && URL.revokeObjectURL(avatar.avatar)
//     }
//   }, [avatar])
//   const handleCLick = () => {
//     if (inputRef.current !== null) {
//       inputRef.current.click()
//     }
//   }
//   const handleUpload = (e: any) => {
//     const file = e.target.files[0]
//     console.log(file, 'file')
//     file.avatar = URL.createObjectURL(file)
//     setAvatar(file)
//     setIsAvatar(true)
//   }
//   return (
//     <div>
//       {isAvatar ? (
//         <div className='avatar-container'>
//           <div className='avatar-items'>
//             <img
//               className='avatar'
//               src={avatar.avatar}
//               alt='avatar'
//             />
//           </div>
//           <button>Upload</button>
//         </div>
//       ) : (
//         <div onClick={handleCLick}>
//           <div style={{ color: 'rgb(128, 128, 128, 0.3)' }}>
//             <BiSolidUserCircle size={120} />
//             <AiFillCamera
//               className='camera'
//               color='blue'
//               size={25}
//             />
//           </div>
//           <input
//             type='file'
//             ref={inputRef}
//             onChange={(e) => handleUpload(e)}
//             style={{ display: 'none' }}
//           />
//         </div>
//       )}
//     </div>
//   )
// }

// export default Image
