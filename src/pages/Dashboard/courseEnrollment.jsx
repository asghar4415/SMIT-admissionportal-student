import React from 'react'
import Sidebar from '../../components/Sidebar';

const courseEnrollment = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-4">
      <Sidebar />
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <h1>Hello Course</h1>
      </div>
    </div>
  )
}

export default courseEnrollment
