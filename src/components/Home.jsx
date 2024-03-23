import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState('');
    
    const getUser = async() => {
        try{
            const res = await axios.get('http://localhost:4000/api/profile/userDetail',
            {
               headers:{Authorization: `Bearer ${token}`} 
            })
            setUser(res.data?.userDetail)
            console.log("res", res)

        }
        catch(error){
            console.log("Error in getting user details : ", error);
        }
    }

    useEffect(() => {
        getUser();
    },[])

  return (
    <div>
      <div className='w-11/12 mx-auto flex justify-center items-center my-16 flex-col gap-5'>
        
        <p className='text-black text-3xl font-bold mb-10'>Hii {user.name} 👋</p>

        {
            (user.role === 'employee') ? 
            (
                <div>
                    <NavLink to='/profile'>
                        <button
                        className='border px-7 py-3 bg-black text-white font-semibold rounded-md'>View Profile</button>
                    </NavLink>
                </div>
            ) :
            (
                <div className='flex gap-3'>
                    
                    <NavLink to='/createDeparment'>
                        <button
                        className='border px-7 py-3 bg-black text-white font-semibold rounded-md'>Create Department</button>
                    </NavLink>
                    <NavLink to='/employee-data'>
                        <button
                        className='border px-7 py-3 bg-black text-white font-semibold rounded-md'>Employee Details</button>
                    </NavLink>
                    <NavLink to='/profile'>
                        <button
                        className='border px-7 py-3 bg-black text-white font-semibold rounded-md'>View Profile</button>
                    </NavLink>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default Home
