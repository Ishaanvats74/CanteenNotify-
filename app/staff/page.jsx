"use client";

import React, { useState } from 'react'

const page = () => {
    const [loggedIN,setLoggedIN] = useState(false);

    const handleSubmit = async()=>{
        setLoggedIN(true)
    }


  return (
    <div className='max-h-full h-full flex flex-col justify-center items-center'>
        {loggedIN ? (
            <div>hi</div>
        ):(

            <div className='text-center p-4 space-y-4 border-2'>
                <h1 className='text-2xl font-mono font-semibold'>Staff login here</h1>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="" >Username</label>
                    <input type="text" name="" id="" className='border'/>
                    <label htmlFor="">Password</label>
                    <input type="text" name="" id="" className='border'/>
                    <button className='border mt-4 py-2 text-xl' onClick={()=>handleSubmit()}>Submit</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default page
