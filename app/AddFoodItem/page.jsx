"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [itemName, setItemName] = useState("");
  const [stock, setStock] = useState(true);
  const router = useRouter()

  const inputvalue = (event) => {
    setItemName(event.target.value);
  };
  console.log(itemName);

  const stockvalue = (event) => {
    const value = event.target.value;

    setStock(value === "Instock");
  };
  console.log(stock);
  const handleSubmit = async () => {
    try {
      const fetchdata = async () => {
        const res = await fetch("/api/staff", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemName, stock }),
        });
        const data = await res.json();
        console.log(data);
        setItemName("");
        router.push('/staff')
    };
    fetchdata();
    } catch (error) {
        console.log(error);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Add Food Item
        </h1>
        <div className="space-y-2">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700"
          >
            Food Name
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={inputvalue}
            placeholder="e.g., Veg Burger"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="availability"
            className="block text-sm font-medium text-gray-700"
          >
            Availability
          </label>
          <select
            id="availability"
            value={stock ? "Instock" : "Outofstock"}
            onChange={stockvalue}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Instock">In Stock</option>
            <option value="Outofstock">Out of Stock</option>
          </select>
        </div>

        <button
          onClick={handleSubmit} disabled={itemName === ""}
          className={`w-full ${itemName === "" ? 'bg-gray-400 ':'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-2 rounded-md  transition-colors`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default page;
