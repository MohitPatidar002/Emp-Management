import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Profile = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState('');
    
    const getUser = async() => {
        try{
            const res = await axios.get('http://localhost:4000/api/profile/userDetail',
            {
               headers:{Authorization: `Bearer ${token}`} 
            })
            setUser(res.data?.userDetail)
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
      <div className='text-black w-11/12 mx-auto flex flex-col justify-center items-center my-16'>
        <h1 className='text-black text-2xl font-bold mb-10'>Profile Information</h1>

        <div className='text-xl flex flex-col gap-3'>
            <p><span className='font-semibold'>Name :</span> {user.name}</p>
            <p><span className='font-semibold'>Contact :</span> {user.contact}</p>
            <p><span className='font-semibold'>Email :</span> {user.email}</p>
            <p><span className='font-semibold'>Department :</span> {user.department ? user.department : "Not Assigned"}</p>
            <p><span className='font-semibold'>Role :</span> {user.role}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
