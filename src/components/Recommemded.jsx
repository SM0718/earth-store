import React from 'react'
import { posters } from '../infos/info'

function Recommemded() {
    const data = posters.slice(0,3)
  return (
    <div className='h-auto w-5/6  mx-auto flex flex-col md:flex-row gap-6'>
          
    {
      (data.length !== 0)? data.map((items) => <div className='md:w-5/6 mx-auto relative group' key={items.posterName}>
        <img src={`/.${items.posterImg}`} alt={items.posterName}/>
        
        <span className='group/item'>
          <div className='h-8 top-4 right-14 px-2 bg-[#74a84a] text-white
         rounded hidden group-hover/item:flex group-hover/item:justify-center items-center absolute'>
            <p className='text-xs'>Add to cart</p>
          </div>
          <span className='h-8 w-8 group-hover:flex group-hover:justify-center
         rounded-full peer absolute top-4 right-4 bg-white hidden cursor-pointer'>
          <img className='h-4 w-4 my-auto' src='/./handbag.png'/>
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
  )
}

export default Recommemded