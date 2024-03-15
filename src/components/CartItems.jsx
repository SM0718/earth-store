import React from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function CartItems(cartItems, handelMenu) {

  const navigate = useNavigate()
  
  const deleteItem = async(postId) => {
    try {
      await appwriteService.deleteCartItem(postId)
    } catch (error) {
      
    }
  }
    
  return (
    <div className='h-1/2 overflow-scroll'>
        {
            cartItems.cartItems.map((items) => {
                    return <div key={items.$id} className='flex justify-between mx-4 py-4 last:border-b-0 border-b'>
                        <span onClick={() => navigate(`/shop/${items.productName}`)} className='flex cursor-pointer'>
                            <img className='h-16 w-16 mx-4' src={`/${items.productImg}`}/>
                            <span className='py-1 flex flex-col justify-between'>
                              <p>{items.productName}</p>
                              <p className='text-[#585858]'>{`${items.amount} × Rs ${items.productPrice}`}</p>
                            </span>
                        </span>
                        <span onClick={() => deleteItem(items.$id)} className='rounded-full border border-[#c4dab3] my-auto p-1 text-[#c4dab3] cursor-pointer'>
                        <svg class="ast-mobile-svg ast-close-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z">
                          </path>
                        </svg>
                        </span>
                    </div>
                })
        }
    </div>
  )
}

export default CartItems