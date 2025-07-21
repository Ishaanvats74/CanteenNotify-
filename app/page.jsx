'use client';
import { Switch } from "@/components/ui/switch"
import { useEffect } from "react";


export default function Home() {
  useEffect(()=>{
    try {
      const fetchdata = async()=>{
        await fetch("/api/home",{
          method:"GET",
          
        })
      }
      fetchdata()
      console.log(body)
    } catch (error) {
      alert(error)
    }
  })
  return (
    <div className="max-h-full flex flex-col items-center ">
      <div className=" grid grid-cols-2 gap-10">

        <div className="flex flex-col shadow-lg rounded-lg p-2">
          <div className="space-x-30  flex items-center justify-between m-2">
            <p className="text-2xl font-semibold">Samosa</p>
            <p className="bg-green-500 font-semibold text-white px-2 py-1 text-sm ">In stock</p>
          </div>
          <div className="flex justify-between m-2 space-x-30 ">
            <p className="text-xs text-gray-400">Notify me on this item</p>
            <Switch className={"h-5 "}/>
          </div>
        </div>

      </div>
    </div>
  );
}
