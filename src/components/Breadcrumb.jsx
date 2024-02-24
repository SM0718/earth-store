import React from 'react'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'

function Breadcrumb() {

  const location = useLocation()
  const fullPath = location.pathname.split("/").filter(x => x)

  return (
    <div>Home 
      {
        fullPath.map((items) => {
          return ` / ${_.upperFirst(items)}`
        })
      }
    </div>
  )
}

export default Breadcrumb