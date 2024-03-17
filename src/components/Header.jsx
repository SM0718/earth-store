import React, {useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from './Button'
import appwriteService from '../appwrite/config'
import { login } from '../app/playerSlicer'
import authService from '../appwrite/auth'
import CartItems from './CartItems'
import { useDispatch, useSelector } from 'react-redux'

function Header() {

  const navigate = useNavigate()
  const [cartValue, setCartValue] = useState(0)
  const [toggleHidden, setToggleHidden] = useState()
  const [show, setShow] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  const [selector, setSelector] = useState("")

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
        if (user === "User (role: guests) missing scope (account)") {
          const anonymous = await authService.anonymousSession()
            if(anonymous) {
              const userID = anonymous.$id
              setSelector(userID)
            }
          } else {
            const userID = user.$id
            setSelector(userID)
          }
        }
      }
     catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    cartData(selector)
  })

  useEffect(() => {
    currentUser()
  },[])

 

  useEffect(() => {
    if(toggleHidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [toggleHidden])

  const headerItems = [
    {
      name: "HOME",
      slug: "/"
    },
    {
      name: "ABOUT",
      slug: "/about"
    },
    {
      name: "SHOP",
      slug: "/shop"
    },
    {
      name: "CONTACT",
      slug: "/contact"
    },
  ]

  const handelNavigate = () => {
    setToggleHidden(!toggleHidden)
    navigate('/shop')
  }
  
  const handelMenu = (e) => {
    setShow(false)
    navigate(`${e}`)
  }

  return (
    <div className='relative h-[80px] z-20 flex'>

      {/* Side Cart Start */}
      <div onClick={() => setToggleHidden(!toggleHidden)}  className={`${toggleHidden? "flex z-10" : "hidden"} absolute w-full h-lvh bg-black/30 cursor-pointer`}/>
    <div className={`${toggleHidden? "flex flex-col justify-between animate-[rightIn_1s] z-10" : "hidden"} h-screen md:w-[350px] sm:w-5/6 w-full absolute bg-white right-0`}>
      
      <div className='flex justify-between w-full h-[65px] border-b-[1px] border-slate-300'>
        <h1 className='ml-10 my-auto text-[#7faf59] font-bold'>Shopping Cart</h1>
        <button onClick={() => setToggleHidden(!toggleHidden)} className='mr-5 text-[#7faf59]'>&#10005;</button>
      </div>
      {cartItems && <CartItems handelMenu={handelMenu} cartItems={cartItems}/>}
      {/* <div className='relative'>
            <Button onClick={() => navigate('/cart')} className={"w-full h-14 bg-[#74a84a] text-center text-[16px] font-semibold tracking-widest 'serif': 'Roboto' absolute bottom-20 hover:bg-green-900 text-white"}>VIEW CART</Button>
            <Button onClick={() => handelNavigate()} className={"w-full h-14 bg-[#74a84a] text-center text-[16px] font-semibold tracking-widest 'serif': 'Roboto' absolute bottom-2 hover:bg-green-900 text-white"}>{(cartItems.length > 0)? "CHECKOUT" : "CONTINUE SHOPPING"}</Button>
      </div> */}
    </div>
    {/* Side Cart End */}
    
    <div className='w-full h-[80px] absolute p-4 flex justify-between my-auto'>
      <div className='w-2/5 my-auto lg:text-center'>
        <NavLink to={"/"} className='font-bold text-2xl "serif": "Roboto" '>
          EARTH STORE
        </NavLink>
      </div>

      {/* Visible Navigation Start */}
        <div className='w-3/5 my-auto flex justify-end relative'>

        <div className='w-2/5 xl:flex hidden justify-between mx-auto'>
       {
        headerItems.map((items) => <div key={items.name} className='"serif": "Roboto" text-[17px] font-[17px]'>
            <NavLink to={items.slug}>{items.name}</NavLink>
          </div>
          
        )
      } 
      </div>
      {/* Visible Navigation End */}

      <div className='flex my-auto xl:mr-auto mr-0 gap-8 z-0'>
        <span className='relative'>
          <p className='absolute bg-black text-white rounded-full text-xs font-bold shadow-md px-1 left-5 bottom-4'>{cartValue}</p>
          <img onClick={() => setToggleHidden(!toggleHidden)} className='h-6 w-6 cursor-pointer' src='/./handbag.png'/>
        </span>
        <img className='h-6 w-6 xl:flex hidden' src='/./user.png'/>
        <span onClick={() => setShow(!show)} className={`h-8 w-8 p-1 flex xl:hidden bg-black text-white justify-center items-center
         font-semibold cursor-pointer`}>{show? <span>&#10005;</span> : "☰"}</span>
      </div>
      
      

      </div>

      </div>
      
      <ul className={`${show? "flex  flex-col justify-evenly" : "hidden"} xl:hidden w-full h-[175px] bg-white mt-[80px]`}>
      {
        headerItems.map((items) => <li key={items.name} onClick={() => handelMenu(items.slug)} className='h-full "serif": "Roboto" flex items-center text-[16px] font-[17px]
         border-t last:border-b px-[20px] m-0 cursor-pointer'>
            <NavLink className={"flex items-center"}>{items.name}</NavLink>
          </li>
          
        )
      } 
      </ul>
    </div>
    
  )
}

export default Header


