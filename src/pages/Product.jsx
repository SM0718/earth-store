import React, {useState, useEffect, useRef} from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { posters } from '../infos/info'
import Button from '../components/Button'
import Input from '../components/Input'
import Reviews from '../components/Reviews'

function Product() {

  const {slug} = useParams()
  const poster = posters.filter((items) => items.posterName === slug)
  const navigate = useNavigate()
  const [amount, setAmount] = useState(1)
  return (
    <div className='flex flex-col items-center py-20 border-t'>
      <div className='h-[400px] w-3/4 flex gap-10'>

        <div className='h-[400px] w-1/2 my-auto overflow-hidden relative'>
          <img 
            className='h-full w-full hover:scale-125'
            src={`/${poster[0].posterImg}`}/>
          <span className='h-8 w-8 top-[20px] right-[20px] flex justify-center items-center rounded-full bg-white absolute cursor-pointer'>
            <img className='h-5 w-5'  src='/./search.png'/>
          </span>
          
        </div>

        <div className='w-1/2 flex flex-col gap-2'>

        <div className='flex flex-col gap-4'>
          <Breadcrumb />
          <h1 onClick={() => navigate('/shop')} className='text-[#74A84A] text-[17px] font-normal "serif": "Jost" cursor-pointer'>Postcards</h1>
        </div>
          
          <div>
            <h1 className='text-[30px]'>{poster[0].posterName}</h1>
            <p className='text-[25.5px] text-[#585858] my-2 font-bold'>Rs {poster[0].posterPrice}</p>
            <p className='text-[17px] leading-relaxed'>{poster[0].posterDesc}</p>
          </div>

          <div className='flex justify-start gap-8'>
            <div className='flex'>
              <Button onClick={() => setAmount((prev) => (amount > 1)? prev-1 : prev)} className="w-10 border flex justify-center items-center p-2">-</Button>
              <Input className="w-10 border text-center p-2" type={'text'} value={amount}/>
              <Button onClick={() => setAmount((prev) => prev+1)} className="w-10 border flex justify-center items-center p-2">+</Button>
            </div>
            <div>
              <Button className={"bg-[#74A84A] tracking-wide px-4 py-2 text-white hover:bg-green-800"}>
                ADD TO CART
              </Button>
            </div>
          </div>

          <div className='border-t py-4 mt-4'>
          Category: <span className='text-[#74A84A] hover:text-green-800  cursor-pointer'>Postcards</span>
          </div>

        </div>
      </div>

      <div className='w-3/4 mt-20 border-t'>
        <Reviews />
      </div>
      
    </div>
  )
}

export default Product