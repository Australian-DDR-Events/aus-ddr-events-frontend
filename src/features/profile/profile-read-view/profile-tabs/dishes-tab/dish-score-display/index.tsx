import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { IoOpenOutline } from '@react-icons/all-files/io5/IoOpenOutline';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import CustomIconRatings from 'components/custom-icon-ratings';
import React from 'react';
import { DancerGradedDishesFragment } from 'types/graphql.generated';
import { getAssetUrl } from 'utils/assets';
import { convertGradeToNumber } from 'utils/summer2021';

import SongScoreModal from './song-score-modal';

const DishScoreDisplay = ({
  dancerGradedDish,
}: {
  dancerGradedDish: DancerGradedDishesFragment;
}) => {
  const { gradedDish, scores } = dancerGradedDish;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box textAlign="center" w="fit-content">
      <Center>
        <Image
          src={getAssetUrl(gradedDish.image128)}
          alt={gradedDish.description}
        />
      </Center>
      <Text fontWeight="bold" fontSize="lg">
        {gradedDish.description} {gradedDish.dish!.name}
      </Text>
      <CustomIconRatings
        icon={IoStar}
        id={dancerGradedDish.id}
        rating={convertGradeToNumber(gradedDish.grade)}
        color="gold"
        w={6}
        h={6}
      />
      <Center>
        <Button
          variant="link"
          colorScheme="blue"
          fontSize="3xl"
          fontWeight="bold"
          mt={1}
          onClick={onOpen}
        >
          {scores.reduce((acc, score) => acc + score.value, 0)}
          <Icon as={IoOpenOutline} w={4} h={4} mb={2} ml={2} />
        </Button>
        <SongScoreModal scores={scores} isOpen={isOpen} onClose={onClose} />
      </Center>
    </Box>
  );
};

export default DishScoreDisplay;
