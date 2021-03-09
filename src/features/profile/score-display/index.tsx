import {
  Box,
  Flex,
  Image,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import CustomIconRatings from 'components/custom-icon-ratings';
import React from 'react';
import { IoStar } from 'react-icons/io5';
import { Song } from 'types/core';
import { defaultPixel } from 'types/styled';
import { Summer2021Score } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';
import { convertGradeToNumber } from 'utils/summer2021';

const ScoreDisplay = ({
  dancerGradedIngredient,
  song,
}: {
  dancerGradedIngredient: Summer2021Score;
  song?: Song;
}) => {
  if (!song) return <Text>Uh oh</Text>;
  const songColors = getColorByDifficulty(song.difficulty);
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px');
  return (
    <Flex
      maxW={isSmallerThan1024 ? '100%' : 'fit-content'}
      overflow="hidden"
      borderWidth={2}
      borderRadius="lg"
      borderColor={songColors.border}
      boxShadow={`${defaultPixel * 1.5}px ${defaultPixel * 1.5}px 0 ${
        songColors.shadow
      }`}
      transition="box-shadow 300ms ease-in-out"
      _hover={{
        boxShadow: `${defaultPixel * 1.5 * 1.5}px ${
          defaultPixel * 1.5 * 1.5
        }px 0 ${songColors.shadow}`,
      }}
      {...(isSmallerThan1024 && { w: '100%' })}
    >
      <Image
        src={getAssetUrl(song.image128)}
        h={isSmallerThan1024 ? '95px' : '128px'}
      />
      <Box mt={2} ml={2} textAlign="left">
        <Text fontWeight="bold">EX score</Text>
        <Text
          fontSize={isSmallerThan1024 ? 'md' : 'xl'}
          mt={isSmallerThan1024 ? -2 : 0}
        >
          {dancerGradedIngredient.score.value}
        </Text>

        <Text fontWeight="bold">
          {dancerGradedIngredient.gradedIngredient.description}&nbsp;
          {dancerGradedIngredient.gradedIngredient.name}
        </Text>
        <CustomIconRatings
          icon={IoStar}
          id={dancerGradedIngredient.id}
          rating={convertGradeToNumber(
            dancerGradedIngredient.gradedIngredient.grade,
          )}
          color={songColors.shadow}
          w={isSmallerThan1024 ? 4 : 6}
          h={isSmallerThan1024 ? 4 : 6}
          mt={isSmallerThan1024 ? -2 : 0}
        />
      </Box>
      <Spacer />
      <Image
        src={getAssetUrl(dancerGradedIngredient.gradedIngredient.image128)}
        h={isSmallerThan1024 ? '90px' : '128px'}
      />
    </Flex>
  );
};

export default ScoreDisplay;
