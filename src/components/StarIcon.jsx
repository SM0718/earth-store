import React, {useState} from 'react';

const StarIcon = ({sendDataToParent}) => {
    const [rating, setRating] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [clicked, setClicked] = useState(false)

  const handleMouseEnter = (index) => {
    if(currentIndex === 0){
        setRating(index + 1);
    }
  };
  const handleClick = (index) => {
    setRating(index + 1);
    setCurrentIndex(index + 1)
    setClicked(true)
    sendDataToParentOnClick(index+1)
  };
  const handleMouseLeave = (e) => {
    if(!clicked) {
      setRating(0)
    }
  }

  const sendDataToParentOnClick = (inputValue) => {
    sendDataToParent(inputValue);
  };

  const StarRating = ({ filled, onMouseEnter, onClick }) => {
    return <span
      className={`cursor-pointer my-auto inline-block w-4 h-4 rounded-full border-2  ${
        filled? 'bg-[#74A84A] border-[#74A84A]' : 'bg-white border-gray-400'
      }`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
    </span>
  }
  return (
    <div className="flex items-center my-auto gap-2"
          onMouseLeave={(e) => handleMouseLeave(e)}
    >
    {[...Array(5)].map((_, index) => (
      <StarRating
        key={index}
        filled={index < rating}
        onMouseEnter={() => handleMouseEnter(index)}
        onClick={() => handleClick(index)}
      />
    ))}
  </div>
  );
};

export default StarIcon;
