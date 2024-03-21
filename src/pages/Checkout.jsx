  import React, {useState,useEffect, useMemo} from 'react'
  import Button from '../components/Button'
  import Input from '../components/Input'
  import Breadcrumb from '../components/Breadcrumb'
  import appwriteService from '../appwrite/config'
  import authService from '../appwrite/auth'
  import {useForm} from 'react-hook-form'
  import Footer from '../components/Footer'
  import { useNavigate } from 'react-router-dom'
  import { useDispatch, useSelector } from 'react-redux'
  


  function Checkout() {

    const {register, handleSubmit} = useForm()
    const [cartValue, setCartValue] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const [selector, setSelector] = useState("")
    const navigate = useNavigate()
    const fetchCart = useSelector((state) => state.fetchData)

    useEffect(() => {
      window.scrollTo({
        top: 0,
      });
    }, [])

    const cartData = async(selector) => {
      try {
        const items = await appwriteService.getCartData(selector)
        if(items) {
          setCartItems(items.documents)
        }
      } catch (error) {
        console.log(error)
      }
    }

    

    const currentUser = async() => {
      try {
        const user = await authService.getCurrentUser()
        if(user) {
          if (user === "User (role: guests) missing scope (account)") {
            const anonymous = await authService.anonymousSession()
              if(anonymous) {
                const userID = anonymous.$id
                cartData(userID)
              }
            } else {
              const userID = user.$id
              cartData(userID)
            }
          }
        }
      catch (error) {
        console.log(error.message)
      }
    }

    useEffect(() => {
      currentUser()
    },[fetchCart])
  
    useMemo(() => {
      const total = cartItems.reduce((acc, item) => acc + Number(item.amount) * Number(item.price), 0);
      setCartValue(total);
    }, [cartItems]);

    return (
      <>
      <div className='w-full lg:w-5/6 mx-auto px-2 mb-8 lg:px-10'>
        <span className='w-full lg:w-3/4 mx-auto flex flex-col md:flex-row justify-between items-center'>
            <h1 className='text-center text-4xl font-semibold my-4'>CHECKOUT</h1>
            <Breadcrumb  className={"text-lg"}/>
          </span>
        <div className='flex flex-col lg:flex-row justify-between mt-4'>
        <form onSubmit={handleSubmit()} className='w-full lg:w-1/2 flex  flex-col gap-4'>
          <div className='w-full flex flex-col md:flex-row gap-2'>
            <span className='w-full lg:w-1/2 flex flex-col gap-2'>
              <Input className={"w-full border-2 py-3 px-4 rounded"} label={"First Name"} required={true} placeholder={"First Name"}/>
            </span>
            <span className='w-full lg:w-1/2 flex flex-col gap-2'>
              <Input className={"w-full border-2 py-3 px-4 rounded"} label={"Last Name"} required={true} placeholder={"Last Name"}/>
            </span>
          </div>
          <div>
          <span className='w-full flex flex-col gap-2'>
              <Input className={"w-full border-2 py-3 px-4 rounded"} label={"Country"} required={true} placeholder={"Country"}/>
          </span>
          <span className='w-full flex flex-col gap-2 mt-4'>
              <Input className={"w-full border-2  py-3 px-4 rounded"} label={"Street Address"} required={true} placeholder={"Street Name"}/>
          </span>
          <span className='w-full flex flex-col gap-2 mt-4'>
              <Input className={"w-full border-2  py-3 px-4 rounded"} label={"Town / City"} required={true} placeholder={"Town / City"}/>
          </span>
          <span className='w-full flex flex-col gap-2 mt-4'>
              <Input className={"w-full border-2  py-3 px-4 rounded"} label={"State / County"} required={true} placeholder={"State / County"}/>
          </span>
          <span className='w-full flex flex-col gap-2 mt-4'>
              <Input className={"w-full border-2  py-3 px-4 rounded"} label={"Postcode / ZIP"} required={true} placeholder={"Postcode / ZIP"}/>
          </span>
          <span className='w-full flex flex-col gap-2 mt-4'>
              <Input className={"w-full border-2  py-3 px-4 rounded"} label={"Phone "} required={true} placeholder={"Phone"}/>
          </span>
          <span className='w-full flex flex-col gap-2 mt-4'>
              <Input className={"w-full border-2  py-3 px-4 rounded"} label={"Email Address "} required={true} placeholder={"Email address"}/>
          </span>
          </div>
            
        </form>

        <div className='w-full lg:w-1/2 p-4'>
          <div className='w-full lg:w-5/6 mx-auto flex flex-col border p-4'>
            <span className='w-full flex justify-between '>
              <p className='font-semibold text-lg'>PRODUCTS</p>
              <p className='font-semibold text-lg'>TOTAL</p>
            </span>
            <div className=' mt-4'>
              {
              (cartItems.length > 0)? cartItems.map((items) => {
              return  <span className='w-full flex justify-between last:border-none border-b py-4'>
                  <p className='text-lg'>{items.name} × {items.amount}</p>
                  <p className='text-lg'>Rs {items.amount * items.price}</p>
                </span>
              }) : <div className='text-center my-6 mx-auto'>
                <h1 className='text-2xl'>Your Cart Seems Empty &#128532;</h1>
                <h2 onClick={() => navigate("/shop")} className='text-xl mb-2 cursor-pointer text-[#74A84A] hover:text-green-900'>Shop Here</h2>
              </div>
            }
            <div>
              <p className='text-lg text-center py-4 font-semibold'>SUBTOTAL: {cartValue}</p>
              <span onClick={() => navigate(`${(cartItems.length)? "/checkout" : "/shop"}`)} className='bg-[#74A84A] hover:bg-green-900 hover:text-white px-4 py-4 cursor-pointer flex items-center justify-center rounded'>
                  <Button>{(cartItems.length)? "PAYMENT" : "CONTINUE SHOPPING"}</Button>
                </span>
            </div>
            
            </div>
            
          </div>
        </div>
        </div>

        
        
      </div>
      <Footer />
      </>
      
    )
  }

  export default Checkout