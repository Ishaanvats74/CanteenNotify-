"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white fixed top-0 left-0 w-full h-16 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm sm:text-base font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Canteen-Notify
          </Link>
          <Link href="/alerts" className="hover:text-blue-600 transition">
            View Alerts
          </Link>
          <Link href="/staff" className="hover:text-blue-600 transition">
            Staff Login
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-4 sm:px-6 hover:bg-[#5a37d1] transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton fallback="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
