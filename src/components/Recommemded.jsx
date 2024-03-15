import React, { useState, useEffect } from 'react';
import { posters } from '../infos/info';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config'

function Recommended() {
    const data = posters.slice(0, 3);
    const navigate = useNavigate();
    const [ip, setIp] = useState("")

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIp(data.ip);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      }, [])

    const addItem = async(productName, productImg, productPrice, amount=1, ip) => {
      console.log("Inside Recommended", amount, ip)
      try {
          const info = await appwriteService.createCartItems(productName, productImg,
             productPrice.toString(),
             amount.toString(),
             ip)
          if(info) {
              console.log(info)
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
                                    items.posterImg,
                                    items.posterPrice,
                                    1,
                                    ip
                                )
                            }
                            className='h-8 w-8 group-hover:flex group-hover:justify-center rounded-full peer absolute top-4 right-4 bg-white hidden cursor-pointer'>
                                <img className='h-4 w-4 my-auto' src='/./handbag.png' />
                            </span>
                        </span>

                        <div className='mb-4'>
                            <p className='text-[14.45px] text-[#585858] my-2'>POSTERS</p>
                            <h3 className='text-[15px] font-semibold mb-1'>{items.posterName}</h3>
                            <h5 className='text-[15px] font-semibold'>${items.posterPrice}</h5>
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
