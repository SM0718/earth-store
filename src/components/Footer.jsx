import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Footer() {

  const currentDate = new Date();

  const footerItems = [
    {
      name: "HOME",
      slug: "/"
    },
    {
      name: "ABOUT",
      slug: "/about"
    },
    {
      name: "SHOP",
      slug: "/shop"
    },
    {
      name: "CONTACT",
      slug: "/contact"
    },
  ]

  return (
    <div className='w-5/6 md:w-full  inset-x-0 top-0 footer  mx-auto flex flex-col lg:flex-row justify-between z-20'>

      <div className='w-4/5 my-auto mx-auto py-8 flex justify-evenly'>
        <div className='w-2/5 flex flex-col md:flex-row justify-between text-center gap-4'>
       {
        footerItems.map((items) => <div key={items.name} className='"serif": "Roboto" text-[17px] font-[17px]'>
            <NavLink to={items.slug}>{items.name}</NavLink>
          </div>
          
        )
      } 
        </div>
      </div>

      <div className=' w-full lg:w-1/3 my-auto mx-auto py-8 text-center'>
        <NavLink to={"/"} className='font-bold text-2xl "serif": "Roboto"'>
          EARTH STORE
        </NavLink>
      </div>

      <div className=' w-full lg:w-2/3 my-auto mx-auto py-8 text-center'>
        Copyright © {currentDate.getFullYear()} Planet Earth Store
      </div>

    </div>
      
  )
}

export default Footer