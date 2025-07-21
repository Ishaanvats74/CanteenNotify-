'use client';
import { Switch } from "@/components/ui/switch"


export default function Home() {
  const data = ()=>{
    const fetchdata = async()=>{

    }
  }
  return (
    <div className="max-h-full flex flex-col items-center ">
      <div className="flex flex-col   border-black border-2 max-w-60">
        <div className="  flex items-center justify-between m-2">
          <p className="text-2xl font-semibold">Samosa</p>
          <p className="bg-green-500 text-white px-1 text-sm ">In stock</p>
        </div>
        <div className="flex justify-between m-2 gap-5">
          <p className="text-sm">Notify me on this item</p>
          <Switch />
        </div>
      </div>
    </div>
  );
}
