import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import Button from './Button';

function CartItems({ cartItems }) {
  const navigate = useNavigate();
  const [cartValue, setCartValue] = useState(0);

  const deleteItem = async (postId, amount, price) => {
    try {
      const deleted = await appwriteService.deleteCartItem(postId);
      if(deleted) {
        setCartValue(prev => prev - (amount * price))
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
    <div className='min-h-full flex flex-col justify-center'>
      <div className='h-1/2 overflow-y-scroll no-scrollbar'>
        {cartItems.map((item) => (
          <div key={item.$id} className='flex justify-between mx-4 py-4 last:border-b-0 border-b'>
            <span onClick={() => navigate(`/shop/${item.name}`)} className='flex cursor-pointer'>
              <img className='h-16 w-16 mx-4' src={`/${item.img}`} alt={item.name} />
              <span className='py-1 flex flex-col justify-between'>
                <p>{item.name}</p>
                <p className='text-[#585858]'>{`${item.amount} × Rs ${item.price}`}</p>
              </span>
            </span>
            <span onClick={() => deleteItem(item.$id, Number(item.amount), Number(item.price))} className='rounded-full border border-[#c4dab3] my-auto p-1 text-[#c4dab3] cursor-pointer'>
              <svg className="ast-mobile-svg ast-close-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
      
      <div className='h-2/5 flex flex-col justify-center gap-2 mb-4 '>
      {
      (cartValue > 0) && <span className='w-full flex justify-between px-4 py-3 border-t border-b'>
          <strong className='text-[#74A84A]'>Subtotal:</strong>
          <p className='text-[#585858] text-[17px] '>Rs {cartValue}</p>
        </span>
      }  
            <Button onClick={() => navigate('/cart')} className={"w-full h-14 bg-[#74a84a] text-center text-[16px] font-semibold tracking-widest 'serif': 'Roboto' hover:bg-green-900 text-white"}>VIEW CART</Button>
            <Button onClick={() => handelNavigate()} className={"w-full h-14 bg-[#74a84a] text-center text-[16px] font-semibold tracking-widest 'serif': 'Roboto'  hover:bg-green-900 text-white"}>{(cartItems.length > 0)? "CHECKOUT" : "CONTINUE SHOPPING"}</Button>
      </div>
      </div>
  );
}

export default CartItems;
