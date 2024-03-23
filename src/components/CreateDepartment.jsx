import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

const CreateDepartment = () => {
    const [department, setDepartment] = useState('');
    const [departmentData, setDepartmentData] = useState([]);

    const handleSubmit = async() => {
    
        try {
            await axios.post("http://localhost:4000/api/department/createDepartment", {department}) 
            setDepartment('');
            toast.success("Department Created")
        } 
        catch (error) {
            console.log("Department creation failed", error)
        }
    }

    const handleDelete = async(id) => {
        try {
            console.log(id)
            await axios.delete("http://localhost:4000/api/department/deleteDepartment", {data: {id}}) 
            toast.success("Department Deleted")
        } 
        catch (error) {
            console.log("Failed to delete a Department", error)
        }
    }

    const getAllDepartment = async() => {
        try{
            const res = await axios.get('http://localhost:4000/api/department/getAllDepartment')
            console.log(res)
            setDepartmentData(res.data?.getAllDepartment)
        }
        catch(error){

        }
    }

    useEffect(() => {
        getAllDepartment();
    },[handleSubmit,handleDelete])

  return (
    <div>
      <div className='w-11/12 mx-auto flex justify-center items-center my-16 flex-col gap-14'>
        <div className='text-black flex flex-col gap-5 text-center'>
            <p className='font-bold text-2xl'>Create New Department</p>
            <div className='flex gap-3'>
                <input className='w-[400px] border pl-5 py-2 rounded-sm'
                    type='text'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder='Enter Department Name'
                />
                <button onClick={handleSubmit}
                    className='px-4 py-2 bg-blue-600 text-white rounded-md'>
                    Create
                </button>
            </div>
        </div>

        <div >
            <p className='font-bold text-2xl'>Department List -</p>

            <div className=' text-black mt-10 p-5 shadow-2xl flex flex-col gap-5 w-[400px]'>
                {
                    departmentData.map((element, index) => {
                        return (
                            <div className='flex justify-between items-center' key={index}>
                                <p >{element.department_Name}</p>
                                <MdDelete onClick={() => handleDelete(element._id)}
                                className='text-2xl cursor-pointer hover:bg-slate-300 rounded-full'/>
                            </div>
                         
                        )
                    })
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreateDepartment
