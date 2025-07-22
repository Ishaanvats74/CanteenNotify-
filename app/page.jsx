'use client';
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react";


export default function Home() {
  const [menuList,setMenuList] = useState([]);
  useEffect(()=>{
    try {
      const fetchdata = async()=>{
        const res = await fetch("/api/home",{
          method:"GET",
        })
        const result = await res.json()
        console.log(result)
        setMenuList(result.result)
      }
      const interval = setInterval(()=>{
        fetchdata()

      },100);
      return ()=>clearInterval(interval);
    } catch (error) {
      alert(error)
    }
  },[])
  return (
    <div className="max-h-full flex flex-col items-center ">
      <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
        {menuList.map((item,index)=>(

          <div key={index} className="flex flex-col shadow-lg rounded-lg p-2">
          <div className="space-x-30  flex items-center justify-between m-2">
            <p className="text-2xl font-semibold">{item.name}</p>
            <p className={` font-semibold text-white px-2 py-1 text-sm ${item.available?"bg-green-500":"bg-red-500"}`}>{item.available?"In stock":"Out of stock"}</p>
          </div>
          <div className="flex justify-between m-2 space-x-30 ">
            <p className="text-xs text-gray-400">Notify me on this item</p>
            <Switch className={"h-5 "}/>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
