"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [loggedIN, setLoggedIN] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("/images/eye.svg");
  const [menuList, setMenuList] = useState([]);
  const [Remove, SetRemove] = useState(false);
  const [Username,setUsername] = useState('');
  const [Password,setPassword] = useState('');


  const handleUsername = (event)=>{
    setUsername(event.target.value)
  }
  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }
  
  const handleSubmit = async () => {
    try {
      const fetchdata = async(Username,Password)=>{
        const res = await fetch('/api/staffLogin',{
          method: "POST",
          body:JSON.stringify({Username,Password})
        })
        const data = await res.json();
        if (data.result === "Success") {
          setLoggedIN(true)
        }else {
          alert(data.result);
        }
      }

      fetchdata(Username,Password);

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const res = await fetch("/api/staff", {
          method: "GET",
        });
        const data = await res.json();
        setMenuList(data.result);
      };
      const interval = setInterval(() => {
        fetchdata();
      }, 7000);
      return () => clearInterval(interval);
    } catch (error) {
      alert(error);
    }
  }, []);

  const passwordshow = async () => {
    if (type === "password") {
      setType("text");
      setIcon("/images/eye-off.svg");
    } else {
      setType("password");
      setIcon("/images/eye.svg");
    }
  };

  const updateitem = (itemName, itemAvailable) => {
    try {
      const fetchdata = async (itemName, itemAvailable) => {
        const res = await fetch("/api/staff", {
          method: "PATCH",
          body: JSON.stringify({ itemName, itemAvailable }),
        });
        const data = await res.json();
        console.log(data);
      };
      fetchdata(itemName, itemAvailable);
    } catch (error) {}
  };

  const DeleteTab = async () => {
    {Remove == true ? SetRemove(false) : SetRemove(true);}
};

const handleDelete = async(itemName)=>{
      try {
          const fetchdata = async(itemName)=>{
              const res = await fetch("/api/staff",{
                  method:"DELETE",
                  body: JSON.stringify({itemName})
              })
              const data = await res.json();
              console.log(data)
          }
          fetchdata(itemName)
      } catch (error) {
          console.log(error)
      }

  }

  return (
    <div className="mt-16">
      {loggedIN ? (
        Remove ? (
          <div className="p-6">
            <div className="flex justify-between">
              <Link
                href={"/AddFoodItem"}
                className="text-xl font-semibold mb-4 hover:cursor-pointer shadow p-2 rounded-md hover:scale-110 transition-all duration-200 ease-in-out hover:bg-gray-300"
              >
                + Add New Item
              </Link>
              <button
                onClick={DeleteTab}
                className="text-xl font-semibold mb-4 hover:cursor-pointer shadow p-2 rounded-md hover:scale-110 transition-all duration-200 ease-in-out hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
            <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mt-20">
              {menuList.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col shadow-lg rounded-lg p-2"
                >
                  <div className="space-x-30  flex items-center justify-between m-2">
                    <p className="text-2xl font-semibold">{item.name}</p>
                    <button
                      onClick={() => handleDelete(item.name, item.available)}
                      className={`hover:scale-105 transition-all duration-200 ease-in-out  font-semibold text-black px-2 py-1 text-sm `}
                    >
                      <Image src={'/images/bin.png'} alt="bin" width={30} height={30}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between">
              <Link
                href={"/AddFoodItem"}
                className="text-xl font-semibold mb-4 hover:cursor-pointer shadow p-2 rounded-md hover:scale-110 transition-all duration-200 ease-in-out hover:bg-gray-300"
              >
                + Add New Item
              </Link>
              <button
                onClick={DeleteTab}
                className="text-xl font-semibold mb-4 hover:cursor-pointer shadow p-2 rounded-md hover:scale-110 transition-all duration-200 ease-in-out hover:bg-gray-300"
              >
                Delete Item
              </button>
            </div>
            <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mt-20">
              {menuList.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col shadow-lg rounded-lg p-2"
                >
                  <div className="space-x-30  flex items-center justify-between m-2">
                    <p className="text-2xl font-semibold">{item.name}</p>
                    <button
                      onClick={() => updateitem(item.name, item.available)}
                      className={`hover:scale-105 transition-all duration-200 ease-in-out  font-semibold text-white px-2 py-1 text-sm ${
                        item.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {item.available ? "In stock" : "Out of stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
          <div className="border-2 bg-white shadow-lg p-5 rounded-xl flex flex-col justify-center items-center space-y-7">
            <p className="text-2xl font-semibold font-sans">Staff login</p>
            <div className="space-y-4">
              <div className="flex flex-col w-full space-y-1">
                <label htmlFor="username" className="text-sm font-semibold">
                  Username
                </label>
                <input
                  onChange={handleUsername}
                  type="text"
                  placeholder="Enter Your username"
                  className="px-3 border w-80 h-10 rounded-md shadow shadow-gray-200 focus:outline-none focus:border-2 focus:border-black"
                />
              </div>

              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="password" className="font-semibold text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handlePassword}
                    type={type}
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-3 pr-10 h-10 border rounded-md shadow shadow-gray-200 focus:outline-none focus:border-2 focus:border-black"
                  />
                  <Image
                    src={icon}
                    alt="Toggle visibility"
                    height={20}
                    width={20}
                    onClick={passwordshow}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  />
                </div>
                <button className="text-sm font-semibold text-right mt-1">
                  Forgot password?
                </button>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className="border w-full bg-blue-700 text-white h-10 rounded-sm hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
