import { Icon } from '@chakra-ui/react';
import { IconType } from '@react-icons/all-files/lib';
import React from 'react';

interface CustomIconRatingsProps extends React.HTMLAttributes<any> {
  id: string;
  rating: number;
  maxRating?: number;
  color: string;
  icon: IconType;
  [x: string]: any;
}

const CustomIconRatings = ({
  id,
  rating,
  color,
  maxRating = 5,
  icon,
  ...props
}: CustomIconRatingsProps) => {
  return (
    <>
      {Array(maxRating)
        .fill('')
        .map((_, i) => (
          <Icon
            as={icon}
            key={`${id}-${i}`}
            color={i < rating ? color : 'gray.300'}
            {...props}
          />
        ))}
    </>
  );
};

export default CustomIconRatings;
