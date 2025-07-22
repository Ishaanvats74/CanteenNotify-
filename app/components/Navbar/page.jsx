'use client';
import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'



import React from 'react'

const Navbar = () => {
  return (
    <header className="bg-white absolute w-full flex justify-between items-center p-4 gap-4 h-16">
            
            <div className='flex justify-evenly gap-3'>
              <Link href={"/"}>Canteen-Notify</Link>
              <Link href={" /alerts"}>View alerts </Link>
              <Link href={"/staff"}>Staff Login</Link>
            </div>
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
  )
}

export default Navbar
