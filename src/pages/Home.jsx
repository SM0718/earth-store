import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { posters } from '../infos/info'
import { reviews } from '../infos/reviews'


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
        <div className='h-auto w-5/6  mx-auto flex flex-col md:flex-row gap-6'>
          
                  {
                    (data.length !== 0)? data.map((items) => <div className='md:w-5/6 mx-auto relative group' key={items.posterName}>
                      <img src={items.posterImg} alt={items.posterName}/>
                      
                      <span className='group/item'>
                        <div className='h-8 top-4 right-14 px-2 bg-[#74a84a] text-white
                       rounded hidden group-hover/item:flex group-hover/item:justify-center items-center absolute'>
                          <p className='text-xs'>Add to cart</p>
                        </div>
                        <span className='h-8 w-8 group-hover:flex group-hover:justify-center
                       rounded-full peer absolute top-4 right-4 bg-white hidden cursor-pointer'>
                        <img className='h-4 w-4 my-auto' src='./handbag.png'/>
                      </span>
                      </span>
                      
                      
                      <div className='mb-4'>
                          <p className='text-[14.45px] text-[#585858] my-2'>POSTERS</p>
                          <h3 className='text-[15px] font-semibold mb-1'>{items.posterName}</h3>
                          <h5 className='text-[15px] font-semibold'>${items.posterPrice}</h5>
                      </div>
                    </div>) : <div className='w-full flex flex-col justify-center content-center gap-10'>
                        <div className='w-16 h-16 mx-auto rounded-full border-2 border-t-black animate-spin'/>
                    </div>
                  }
        </div>
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