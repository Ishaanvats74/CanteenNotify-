'use client'
import React, { useState } from 'react'

const page = () => {
    const [itemName,setItemName] = useState('');
    const [stock,setStock] = useState(true)

    const inputvalue = (event)=>{
        setItemName(event.target.value)
    }
    console.log(itemName)

    const stockvalue = (event)=>{
        const value = event.target.value;

            setStock(value === "Instock")
        
    }
    console.log(stock)
    const handleSubmit = async()=>{
        try{
            const fetchdata = async()=>{
                const res = await fetch('/api/staff',{
                    method:"POST",
                     headers: {
                        "Content-Type": "application/json", 
                    },
                        body: JSON.stringify({itemName,stock})
                })
                const data = await res.json();
                console.log(data);
            }
            fetchdata()
        } catch(error){
            console.log(error)
        }
    }


  return (
    <div className="mt-16">
      <div className='h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col'>
            <h1>Add Detail</h1>
            <label htmlFor="itemName">Item name</label>
            <input type="text" name="" id="itemName" onChange={inputvalue} value={itemName}/>
            <select name="" id="" value={stock ? "Instock" : "Outofstock"} onChange={stockvalue}>
                <option value="Instock">In Stock</option>
                <option value="Outofstock">Out of Stock</option>
            </select>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default page
