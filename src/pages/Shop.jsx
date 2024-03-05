import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Footer from '../components/Footer'
import Input from '../components/Input'
import Button from '../components/Button'
import { posters } from '../infos/info'
import {useForm} from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'


function Shop() {
  
  const {register, handleSubmit} = useForm()
  const [val, setVal] = useState(80)
  const [totalItems, setTotalItems] = useState(posters.length)
  const [data, setData] = useState(posters)
  const [searchVal, setSearchVal] = useState("")
  const [sortingValue, setSortingValue] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const fullPath = location.pathname.split("/").filter(x => x)

  const create = (searchValue) => {
      setSearchVal(searchValue.search)
      const filteredData = posters.filter((item) => item.posterName === searchValue.search);
      console.log("Inside Shop",filteredData)
      if(filteredData.length === 1) {
        navigate(`/shop/${encodeURIComponent(filteredData[0].posterName)}`)
        document.title = "Search Reasult For " + searchValue.search
        setSearchVal("")
      } else if(filteredData.length === 0) {
        document.title = "Search Reasult For " + searchValue.search
        setData([])
      }
  }

  const handleChange = (e) => {
    setVal(e.target.value);   
}

useEffect(() => {
  const filteredData = posters.filter((item) => item.posterPrice <= val);
  setData(filteredData);
  setTotalItems(filteredData.length);
}, [val])

  const handelSorting = (sort) => {
    setSortingValue(sort)  
  }

  useEffect(() => {
    if(sortingValue === "Default Sorting"){
      setData(posters)
    } else if(sortingValue === "Sort by price: Low to High") {
      const sortedAscending = [...data].sort((a, b) => a.posterPrice - b.posterPrice);
      setData(sortedAscending)
    } else if(sortingValue === "Sort by price: High to Low") {
      const sortedDescending = [...data].sort((a, b) => b.posterPrice - a.posterPrice);
      setData(sortedDescending)
    }
  }, [sortingValue])
  
  return (
    <div className='w-full border-t-[1px]'>
    
    <div className='min-h-full w-full md:w-5/6 mx-auto mt-16 flex flex-col-reverse md:flex-row'>
      
    <aside className='md:h-dvh  md:w-1/4 md:pr-4 pt-8 flex flex-col items-center'>
      <form onSubmit={handleSubmit(create)} className='w-full flex gap-2 px-4'>
                
        <Input
                placeholder="Search Products..."
                className= "w-full p-2 outline outline-1 outline-slate-600"
                {...register("search")}
                />

        <Button type="submit" 
                  className="flex justify-center items-center p-3 bg-[#74a84a] hover:bg-[#2c541d]">
                    <svg viewBox="0 0 24 24" width="24" height="24">
<path d="M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"></path>
</svg>
                </Button>
      </form >

      <div className='w-full flex flex-col items-start relative my-8'>
        <h2 className='text-[24px] font-bold pl-4'>Fliter By Price</h2>
        <div className="w-full p-4 flex flex-col">
          <Input 
          className="w-full"
          type="range"
          min="11"
          max="80"
          value={val}
          onChange={(e) => handleChange(e)}
          />
          <Input 
            className="w-14 h-14 border ml-auto mt-2 p-0 text-center"
            type="text"
            value={`${val}`}
            onChange={(e) => handleChange(e)}
          />
      
    </div>
      </div>
    </aside>

      <div className='md:w-3/4 md:full md:pl-12 px-2 border-l-[1px]'>
        <div>
          <Breadcrumb />
          <h1 className='text-[#74A84A] text-[70px] font-medium "serif": "Jost"'>{searchVal? `Search Results For: "${searchVal}"` : fullPath[0].toUpperCase()}</h1>
        </div>

        <div className='mr-24 mt-8'>
          <div className=' flex md:flex-row flex-col justify-between'>
            <p>Showing all {totalItems} results</p>
            <select className='bg-white px-4 py-2 focus:outline-none' onChange={(e) => handelSorting(e.target.value)}>
            <option value="Default Sorting">
                Default Sorting
              </option>
              <option value="Sort by price: Low to High">
                Sort by price: Low to High
              </option>
              <option value="Sort by price: High to Low">
                Sort by price: High to Low
              </option>
            </select>
          </div>
          
        </div>

         <div className='h-auto w-full pt-8 flex justify-center md:justify-start flex-wrap gap-2'>
          
         {
                    (data.length !== 0)? data.map((items) => <div className='w-full md:w-64 mt-4 mr-4 relative group' key={items.posterName}>
                      <img className='md:h-64' src={items.posterImg} alt={items.posterName}/>
                      
                      <span className='group/item'>
                        <div className='h-8 top-4 right-14 px-2 bg-[#74a84a] text-white
                       rounded hidden group-hover/item:flex group-hover/item:justify-center items-center absolute'>
                          <p className='text-xs'>Add to cart</p>
                        </div>
                        <span className='h-8 w-8 group-hover:flex group-hover:justify-center
                       rounded-full peer absolute top-4 right-4 bg-white hidden cursor-pointer'>
                        <img className='h-4 w-4 my-auto' src='./handbag.png'/>
                      </span>
                      </span>
                      
                      
                      <div className='mb-4'>
                          <p className='text-[14.45px] text-[#585858] my-2'>POSTERS</p>
                          <h3 className='text-[15px] font-semibold mb-1'>{items.posterName}</h3>
                          <h5 className='text-[15px] font-semibold'>${items.posterPrice}</h5>
                      </div>
                    </div>) : <div className='w-full flex flex-col justify-center content-center gap-10'>
                        <div className='w-16 h-16 mx-auto rounded-full border-2 border-t-black animate-spin'/>
                    </div>
                  }
          </div>       
        
      </div>

      
    </div>

    <Footer />
    </div>
    
  )
}

export default Shop