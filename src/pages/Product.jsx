import React, {useState, useEffect, useRef} from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { posters } from '../infos/info'
import Button from '../components/Button'
import Input from '../components/Input'
import Reviews from '../components/Reviews'
import Recommemded from '../components/Recommemded'
import Footer from '../components/Footer'
import appwriteService from '../appwrite/config'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux';
import { fetchCartData } from '../app/playerSlicer';

function Product() {

  const {slug} = useParams()
  const poster = posters.filter((items) => items.posterName === slug)
  const navigate = useNavigate()
  const location = useLocation()
  const [amount, setAmount] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [])
  
  useEffect(() => {
    setAmount(1)
  }, [location])

const addItem = async(name, price, img, amount) => {
  try {
      const user = await authService.getCurrentUser()
      if(user){
        const items = await appwriteService.getCartData(user.$id)
        {
            if(items.total > 0) {
                const hasItem = items.documents.filter((item) => item.name === name)
                if(hasItem.length > 0) {
                    const data = await appwriteService.updateCartProducts(hasItem[0].$id, {amount: hasItem[0].amount + Number(amount)})
                    if(data) {
                      dispatch(fetchCartData())
                  }
                } else {
                    const data = await appwriteService.createCartItems(name, price.toString(), user.$id, img, Number(amount))
                    if(data) {
                      dispatch(fetchCartData())
                  }
                }
            } else {
                const data = await appwriteService.createCartItems(name, price.toString(), user.$id, img, Number(amount))
                if(data) {
                  dispatch(fetchCartData())
              }
            }
        }
      }
      
  } catch (error) {
      console.log(error)
  }
}
  
  const handelKeyDown = (e) => {
    
    if(!isNaN(e) && e <= 20) {
      setAmount(e)
    } else if(e > 20) {
      setAmount(20)
    }
     else {
      setAmount("")
    }
}

  return (
    <>
    <div className='min-h-full flex flex-col items-center px-4 py-20 border-t'>
        <div className='h-auto md:w-3/4 w-full md:px-4 flex xl:flex-row flex-col xl:items-center md:gap-6 gap-8'>

        <div className='overflow-auto relative' >
          <img 
            className='h-full w-full hover:scale-125'
            src={`/${poster[0].posterImg}`}/>
          <span className='h-8 w-8 top-[20px] right-[20px] flex justify-center items-center rounded-full bg-white absolute cursor-pointer'>
            <img className='h-5 w-5'  src='/./search.png'/>
          </span>
          
        </div>

        <div className='w-full xs:w-1/2 flex flex-col gap-2'>

        <div className='flex flex-col gap-4'>
          <Breadcrumb />
          <h1 onClick={() => navigate('/shop')} className='text-[#74A84A] text-[17px] w-[80px] font-normal "serif": "Jost" cursor-pointer'>Postcards</h1>
        </div>
          
          <div>
            <h1 className='text-[30px]'>{poster[0].posterName}</h1>
            <p className='text-[25.5px] text-[#585858] my-2 font-bold'>Rs {poster[0].posterPrice}</p>
            <p className='text-[17px] leading-relaxed'>{poster[0].posterDesc}</p>
          </div>
          <div className='flex justify-start gap-8'>
            <div className='flex'>
              <Button onClick={() => setAmount((prev) => (amount > 1)? prev-1 : prev)} className="w-10 border flex justify-center items-center p-2">-</Button>
              <Input onChange={(e) => handelKeyDown(e.target.value)} className="w-10 border text-center p-2" type={'text'} value={amount}/>
              <Button onClick={() => setAmount((prev) => (amount < 20)? prev+1 : prev)} className="w-10 border flex justify-center items-center p-2">+</Button>
            </div>
            <div>
              <Button
                onClick={() =>
                  addItem(
                        poster[0].posterName,
                        poster[0].posterPrice,
                        poster[0].posterImg,
                        amount
                    )
                }
                className={"bg-[#74A84A] tracking-wide px-4 py-2 text-white hover:bg-green-800"}>
                ADD TO CART
              </Button>
            </div>
          </div>

          <div className='border-t py-4 mt-4'>
          Category: <span className='text-[#74A84A] hover:text-green-800  cursor-pointer'>Postcards</span>
          </div>

        </div>
      </div>

      <div className='h-svh w-full md:w-3/4 mt-8 xl:mt-20 border-t'>
        <Reviews />
      </div>

      <div className='sm:mt-4'>
        <h1 className='w-5/6 mx-auto text-6xl pb-8 font-semibold'>Related Products</h1>
        <Recommemded /> 
      </div>
    </div>
     <Footer />
     </>
  )
}

export default Product