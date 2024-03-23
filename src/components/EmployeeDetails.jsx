import React from 'react'
import EmployeeTable from './EmployeeTable'

const EmployeeDetails = () => {
  return (
    <div>
      <div className='w-11/12 mx-auto flex flex-col justify-center items-center my-16'>
        <h2 className='text-black text-2xl font-bold mb-10'>Employee Details</h2>

        <EmployeeTable/>
      </div>
    </div>
  )
}

export default EmployeeDetails
