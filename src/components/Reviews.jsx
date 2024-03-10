import React, {useState} from 'react'
import Button from './Button'
import StarIcon from './StarIcon'

function Reviews() {

  const [active, setActive] = useState(true)
  const [reviewAmt, setReviewAmt] = useState(0)
  const [color, setColor] = useState("white")
  const [childData, setChildData] = useState("");

  const receiveDataFromChild = (data) => {
    setChildData(data);
  };

  return (
    <div className='w-full text-[#585858]'>
       <div className='flex gap-6 -pt-[1px]'>
        <span onClick={() => setActive(!active)} className={`${active? "border-t-4 border-[#74A84A]" : "border-t-4 border-white"} text-[17px] font-semibold pt-2`}>
            <Button>Description</Button>
        </span>
        <span onClick={() => setActive(!active)} className={`${active? "border-t-4 border-white" : "border-t-4 border-[#74A84A]"} text-[17px] font-semibold pt-2`}>
            <Button>Reviews({reviewAmt})</Button>
        </span>
    </div>

    <div className='relative mt-6'>

      <div className={`${active? "flex flex-col gap-2 absolute" : "hidden"}`}>

        <div className="flex flex-col gap-2 text-[17px]">
            <h1 className='text-[17px] font-bold'>Paper Type: Matte</h1>
          <ul className='leading-loose list-disc pl-3'>
            <li>17.5 pt thickness / 120 lb weight / 324 GSM</li>
            <li>Light white, uncoated matte finish with an eggshell texture</li>
            <li>Paper is easy to write on and won’t smudge</li>
            <li>Made and printed in the USA</li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-2 text-[17px]">
          <h1 className='text-[17px] font-bold'>Paper Type: Semi-Gloss</h1>
          <ul className='leading-loose list-disc pl-3'>
            <li>12.5 pt thickness / 110 lb weight</li>
            <li>Bright white, semi-gloss finish</li>
            <li>50% recycled content</li>
            <li>FSC certified</li>
            <li>Paper imported from Italy; printed in the USA</li>
          </ul>
        </div>
        
        <div className='text-[17px]'>
        <span className='font-extrabold'>Note: </span> <span className='italic font-semibold'>There may be a slight difference in actual color, due to the colors of display.</span>
        </div>
        
      </div>

      <div className={`${active? "hidden" : "flex flex-col gap-2 absolute"} w-full`}>
        <p>There are no reviews yet.</p>
        <div className='p-2 border'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-[22.78px]'>Be the first to review “Postcard V1”</h1>
            <p className='text-[17px]'>Your email address will not be published. Required fields are marked *</p>
          </div>
          <div className='flex gap-4 items-center'>
            <span className='flex items-center text-[20px] font-semibold'>Your rating *</span>
            <span >
            <StarIcon sendDataToParent={receiveDataFromChild}/>
            </span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
   
  )
}

export default Reviews