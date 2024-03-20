import React, { useState, useEffect } from 'react';
import { posters } from '../infos/info';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { fetchCartData } from '../app/playerSlicer';


function Recommended() {
    const data = posters.slice(0, 3);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const addItem = async(name, price, img,) => {
      try {
          const user = await authService.getCurrentUser()
          if(user){
            const items = await appwriteService.getCartData(user.$id)
            {
                if(items.total > 0) {
                    const hasItem = items.documents.filter((item) => item.name === name)
                    if(hasItem.length > 0) {
                        const data = await appwriteService.updateCartProducts(hasItem[0].$id, {amount: hasItem[0].amount + 1})
                        if(data) {
                            dispatch(fetchCartData())
                        }
                    } else {
                        const data = await appwriteService.createCartItems(name, price.toString(), user.$id, img)
                        if(data) {
                            dispatch(fetchCartData())
                        }
                    }
                } else {
                    const data = await appwriteService.createCartItems(name, price.toString(), user.$id, img)
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

    return (
        <div className='h-auto w-5/6 mx-auto flex flex-col md:flex-row gap-6'>
            {data.length !== 0 ? (
                data.map((items) => (
                    <div
                        
                        className='md:w-5/6 mx-auto relative group'
                        key={items.posterName}
                    >
                        <img
                           onClick={() => navigate(`/shop/${items.posterName}`)} 
                            className='cursor-pointer'
                            src={`/.${items.posterImg}`}
                            alt={items.posterName}
                        />

                        <span className='group/item'>
                            <div className='h-8 top-4 right-14 px-2 bg-[#74a84a] text-white rounded hidden group-hover/item:flex group-hover/item:justify-center items-center absolute'>
                                <p className='text-xs'>Add to cart</p>
                            </div>
                            <span onClick={() =>
                              addItem(
                                    items.posterName,
                                    items.posterPrice,
                                    items.posterImg,

                                )
                            }
                            className='h-8 w-8 group-hover:flex group-hover:justify-center rounded-full peer absolute top-4 right-4 bg-white hidden cursor-pointer'>
                                <img className='h-4 w-4 my-auto' src='/./handbag.png' />
                            </span>
                        </span>

                        <div className='mb-4'>
                            <p className='text-[14.45px] text-[#585858] my-2'>POSTERS</p>
                            <h3 className='text-[15px] font-semibold mb-1'>{items.posterName}</h3>
                            <h5 className='text-[15px] font-semibold'>Rs {items.posterPrice}</h5>
                        </div>
                    </div>
                ))
            ) : (
                <div className='w-full flex flex-col justify-center content-center gap-10'>
                    <div className='w-16 h-16 mx-auto rounded-full border-2 border-t-black animate-spin' />
                </div>
            )}
        </div>
    );
}

export default Recommended;
