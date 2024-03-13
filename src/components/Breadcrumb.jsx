import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'

function Breadcrumb({className}) {

  const navigate = useNavigate()
  const location = useLocation()
  const fullPath = location.pathname.split("/").filter(x => x)

  const handelClick = (index) => {
    if(fullPath.length-1 !== index) {
      navigate(`/${fullPath[index]}`)
    }
  }

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

  return (
    <div className={`${className}`}>
      <span className='cursor-pointer hover:text-[#74A84A]' onClick={() => navigate('/')}>Home </span>
      {
        fullPath.map((items, index) => {
          return <span className={`${(fullPath.length === index+1)? null : "cursor-pointer hover:text-[#74A84A]"} "serif": "Roboto" `} key={items} onClick={() => handelClick(index)}>{` / ${capitalizeFirstLetter(decodeURIComponent(items))}`}</span>
        })
      }
    </div>
  )
}

export default Breadcrumb