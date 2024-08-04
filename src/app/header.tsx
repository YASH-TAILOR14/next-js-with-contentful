import React from 'react';
import logo from "./images/logo.jpg";
import { Fragment, useState } from 'react'
import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Transition,
  } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

function header() {
  return (
    <>
      <header className='bg-black'> 
         <nav className="mx-auto flex max-w-7xl items-center p-6 lg:px-8" aria-label="Global" style={{justifyContent:"center"}} >
          <div className="flex lg:flex-1">          
            {/* <a href="./page.tsx" className="-m-1.5 p-1.5 group-hover:text-blue-500 transition-colors font-serif">
              
            </a> */}
            <Link className="group -m-1.5 p-1.5 text-gray-50 font-serif" href="/">
              Fashion Blog
            </Link>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">          
            <a href="/" className="text-sm font-semibold text-gray-50">
              Blog 
            </a>

            <a href="#" className="text-sm font-semibold text-gray-50">
              About
            </a>
            <a href="#" className="text-sm font-semibold text-gray-50">
              Contact
            </a>         
          </PopoverGroup>
         </nav>
    </header>  
    </>
  )
}

export default header
