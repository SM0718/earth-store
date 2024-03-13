import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { posters } from '../infos/info'
import { reviews } from '../infos/reviews'
import Recommemded from '../components/Recommemded'


function Home() {

  const data = posters.slice(0,3)
  const navigate = useNavigate()
  

  const handelClick = () => {
    navigate("/shop")
  }


  return (
    <>
    
    <div className='min-h-full w-full absolute z-0'>
      <div className='h-lvh flex flex-col bg-center bg-no-repeat bg-cover' style={{backgroundImage: "url(./First-Forest.webp)"}}>
          <div className='my-auto text-center leading-tight'>
                  <h1 className='text-[80px] font-semibold "serif": "Jost" tracking-widest text-[#2c541d]'>EARTH</h1>
                  <h2 className='text-[40px] "serif": "Jost" tracking-widest font-light'>MULTIPURPOSE STORE</h2>
                  <Button onClick={() => handelClick()} className={"bg-[#74a84a] py-[15px] px-[50px] text-[16px] text-white my-8 hover:bg-green-800"}>
                    SHOP NOW
                  </Button>
                </div>  
      </div>

      <div className='w-full h-auto flex mt-24 gap-4'>
        <Recommemded />
      </div>

      <div className='w-full border-t-2 my-20'/>

      <div className='w-5/6 mx-auto'>
      <h1 className='text-start md:text-center font-semibold text-[25px] md:text-[41px] mb-10 "serif": "Jost"'>WHAT OUR CUSTOMERS SAY</h1>
        <div className='w-full flex flex-col md:flex-row gap-16'>
        {
        reviews.map((items) => <div className='w-full md:w-[300px] mx-auto'>
          <img className='h-6 mb-4' src="./quotation-mark.png"/>
            <p className='text-[17px] my-4 leading-loose'>{items.comment}</p>
            <img className='rounded-full my-4' src={items.pic}/>
            <p className='"serif": "Roboto" text-[12px] font-semibold'>{items.name}</p>
          </div>
          )
      }

      </div>
      </div>
      
      <div className='w-full h-[500px] mt-32 flex flex-col content-center bg-center bg-no-repeat bg-cover' style={{backgroundImage: "url(./Second-Forest.webp)"}}>
        <div className='my-auto text-center leading-tight'>
        <h2 className='text-[34px] "serif": "Jost" font-semibold mx-auto my-2'><span className='mx-2'>Give</span> <span className='mx-2'>the</span> <span className='mx-2'>Gift</span> <span className='mx-2'>of</span> <span className='mx-2'>a</span> <span className='mx-2'>Postcard</span></h2>
        <p className='mx-auto my-2 text-[17px]'>Give the gift of a lasting memory with a postcard</p>
        <Button onClick={() => handelClick()} className={"w-[300px] bg-[#74a84a] py-[15px] px-[50px] text-[16px] text-white mt-4 mx-auto hover:bg-green-800"}>
          PURCHASE A POSTCARD
        </Button>
      </div>
      </div>
      <Footer />
    </div>
    
    </>
    
  )
}

export default Home