import { Box, Center, Image, Text } from '@chakra-ui/react';
import CustomIconRatings from 'components/custom-icon-ratings';
import React from 'react';
import { IoStar } from 'react-icons/io5';
import { DancerGradedDish } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';
import { convertGradeToNumber } from 'utils/summer2021';

const DishScoreDisplay = ({
  dancerGradedDish,
}: {
  dancerGradedDish: DancerGradedDish;
}) => {
  const { gradedDish, scores } = dancerGradedDish;
  return (
    <Box textAlign="center" w="fit-content">
      <Center>
        <Image src={getAssetUrl(gradedDish.image256)} alt={gradedDish.name} />
      </Center>
      <Text fontWeight="bold" fontSize="lg">
        {gradedDish.description} {gradedDish.name}
      </Text>
      <CustomIconRatings
        icon={IoStar}
        id={dancerGradedDish.id}
        rating={convertGradeToNumber(gradedDish.grade)}
        color="gold"
        w={6}
        h={6}
      />
      <Text fontSize="2xl">
        {scores.reduce((acc, score) => acc + score.value, 0)}
      </Text>
    </Box>
  );
};

export default DishScoreDisplay;
