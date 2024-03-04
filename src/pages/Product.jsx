import React, {useEffect} from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

function Product() {

  const {slug} = useParams()
  const product = slug.split("%20")
  // console.log(product)

  return (
    <div>
      <Breadcrumb />
    </div>
  )
}

export default Product