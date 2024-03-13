import React, {useState} from 'react'
import Button from './Button'
import StarIcon from './StarIcon'
import Input from './Input'
import { useForm } from "react-hook-form";

function Reviews() {

  const [active, setActive] = useState(true)
  const [reviewAmt, setReviewAmt] = useState(0)
  const [color, setColor] = useState("white")
  const [childData, setChildData] = useState("");
  const {register, handleSubmit} = useForm()

  const receiveDataFromChild = (data) => {
    setChildData(data);
  };

  const createReview = (data) => {
    console.log(data)
  }

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

    <div className='w-full relative mt-6 border-r-8'>

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
        <div className='p-2 px-6 border flex flex-col gap-4'>
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

          <form onSubmit={handleSubmit(createReview)} className='flex flex-col gap-3'>

            <label className='flex items-center text-[20px] font-semibold'>Your review *</label>
            <textarea 
              className="w-full h-[100px] p-2 resize border"
              required={true}
              {...register("review", { required: true })}
            />

            <div className='flex flex-col md:flex-row gap-2 md:gap-4'>

              <span className='md:w-1/2 w-full flex flex-col md:gap-2 justify-evenly py-2'>
            <label className='flex items-center text-[20px] font-semibold '>Name *</label>
            <Input 
              className="w-full p-3 resize border"
              required={true}
              {...register("name", { required: true })}
            />
            </span>

              <span className='md:w-1/2 w-full flex flex-col md:gap-2 justify-evenly py-2'>
            <label className='flex items-center text-[20px] font-semibold'>Email*</label>
            <Input 
              className="w-full p-3 resize border"
              required={true}
              {...register("email", { required: true })}
            />
            </span>
            </div>

            <Button className={"w-32 bg-[#74A84A] tracking-wide px-4 py-2 text-white hover:bg-green-800"}>
              SUBMIT
            </Button>

          </form>
        </div>
      </div>
      
    </div>
  </div>
   
  )
}

export default Reviews