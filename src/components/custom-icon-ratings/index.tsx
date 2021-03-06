import { Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface CustomIconRatingsProps extends React.HTMLAttributes<any> {
  id: string;
  rating: number;
  maxRating?: number;
  color: string;
  icon: IconType;
  w: number;
  h: number;
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
            // eslint-disable-next-line react/no-array-index-key
            key={`${id}-${i}`}
            color={i < rating ? color : 'gray.300'}
            {...props}
          />
        ))}
    </>
  );
};

export default CustomIconRatings;
