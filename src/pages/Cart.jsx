import React , { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import authService from '../appwrite/auth';
import Button from '../components/Button';
import Footer from '../components/Footer'
import Input from '../components/Input';
import Breadcrumb from '../components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../app/playerSlicer';

function Cart() {

  const navigate = useNavigate();
  const [selector, setSelector] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [cartValue, setCartValue] = useState(0)
  const [amount, setAmount] = useState({});
  const dispatch = useDispatch()
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
        setCartValue(items.total)
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
            const userID = user.$id
            setSelector(userID)
            dispatch(fetchCartData())
        }
      }
     catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    currentUser()
  },[])

  useEffect(() => {
    cartData(selector)
  }, [selector, fetchCart])

  const deleteItem = async (postId, amount, price) => {
    try {
      const deleted = await appwriteService.deleteCartItem(postId);
      if(deleted) {
        setCartValue(prev => prev - (amount * price))
        dispatch(fetchCartData())
      }
      ;
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useMemo(() => {
    const total = cartItems.reduce((acc, item) => acc + Number(item.amount) * Number(item.price), 0);
    setCartValue(total);
  }, [cartItems]);

  return (
    <>
      <div className=''>
        <span className='w-full md:w-3/4 mx-auto flex flex-col md:flex-row justify-between items-center'>
          <h1 className='text-center text-4xl font-semibold my-4'>YOUR CART</h1>
          <Breadcrumb  className={"text-lg"}/>
        </span>
        

        <div className='h-[400px] flex flex-col mt-8 items-start md:items-center overflow-y-scroll no-scrollbar'>
            {
              (cartItems.length !== 0)? cartItems.map((item) => {
                return <div key={item.$id} className='w-full md:w-3/4 flex justify-between px-2 py-4 border-2'>
                <span  className='w-5/6 mx-auto flex justify-between'>
                  <img onClick={() => navigate(`/shop/${item.name}`)} className='size-20 cursor-pointer mx-4' src={`/${item.img}`} alt={item.name} />
                  <span className='w-full py-1 flex md:flex-row flex-col md:justify-evenly justify-between md:items-center'>
                    <p onClick={() => navigate(`/shop/${item.name}`)} className='cursor-pointer text-lg text-[#74A84A] hover:text-green-900'>{item.name}</p>
                    <p className='text-[#585858] text-lg font-semibold'>{`${item.amount} × Rs ${item.price}`}</p>
                  </span>
                </span>
                <span onClick={() => deleteItem(item.$id, Number(item.amount), Number(item.price))} className='rounded-full border border-[#c4dab3] my-auto p-1 mr-4  text-[#74A84A] hover:text-green-900 cursor-pointer'>
                  <svg className="ast-mobile-svg ast-close-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                    <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z" />
                  </svg>
                </span>
              </div>
              }) : <div className='text-center my-6 mx-auto'>
                <h1 className='text-2xl'>Your Cart Seems Empty &#128532;</h1>
                <h2 onClick={() => navigate("/shop")} className='text-xl mb-2 cursor-pointer text-[#74A84A] hover:text-green-900'>Shop Here</h2>
              </div>
            }
        </div>
           {
            (cartValue > 0)? 
            <div className='w-2/3 mx-auto flex justify-center md:justify-end px-2 py-4 z-0'>
              <span className='text-center flex flex-col md:flex-row  gap-8 text-lg'>
                <span className='flex items-center gap-2'>
                  <p>Cart Total: </p>
                  <p>Rs {cartValue}</p>
                </span>
                <span onClick={() => navigate("/checkout")} className='bg-[#74A84A] hover:bg-green-900 hover:text-white px-4 py-2 flex items-center justify-center rounded'>
                  <Button>CHECKOUT</Button>
                </span>
                
                
              </span>
            </div> : <></>
           } 
          </div>
      <Footer />
    </>
    
  )
}

export default Cart