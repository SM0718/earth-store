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

  return (
    <div className={`${className}`}>
      <span className='cursor-pointer' onClick={() => navigate('/')}>Home </span>
      {
        fullPath.map((items, index) => {
          return <span className={(fullPath.length === index+1)? null : "cursor-pointer"} key={items} onClick={() => handelClick(index)}>{` / ${decodeURIComponent(items)}`}</span>
        })
      }
    </div>
  )
}

export default Breadcrumb