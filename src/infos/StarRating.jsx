import React, { useState } from 'react';
import StarIcon from '../components/StarIcon';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleMouseEnter = (index) => {
    setRating(index + 1);
  };

  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          filled={index < rating}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
