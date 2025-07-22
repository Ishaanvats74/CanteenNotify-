"use client";

import Image from "next/image";
import React, { useState } from "react";
import Icon from "react-icons-kit";

const page = () => {
  const [loggedIN, setLoggedIN] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("/images/eye.svg");

  const handleSubmit = async () => {
    setLoggedIN(true);
  };
  const passwordshow = async () => {
    if (type == "password") {
      setType("text");
      setIcon("/images/eye-off.svg");
    } else {
      setType("password");
      setIcon("/images/eye.svg");
    }
  };

  return (
   <div className="mt-16">
  {loggedIN ? (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Item</h1>
      <p className="text-gray-600">Welcome! Start adding your items here.</p>

    </div>
  ) : (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
      <div className="border-2 bg-white shadow-lg p-5 rounded-xl flex flex-col justify-center items-center space-y-7">
        <p className="text-2xl font-semibold font-sans">Staff login</p>
        <div className="space-y-4">
          <div className="flex flex-col w-full space-y-1">
            <label htmlFor="username" className="text-sm font-semibold">Username</label>
            <input
              type="text"
              placeholder="Enter Your username"
              className="px-3 border w-80 h-10 rounded-md shadow shadow-gray-200 focus:outline-none focus:border-2 focus:border-black"
            />
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="password" className="font-semibold text-sm">Password</label>
            <div className="relative">
              <input
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
            <button className="text-sm font-semibold text-right mt-1">Forgot password?</button>
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
