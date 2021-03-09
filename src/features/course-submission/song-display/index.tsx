import { Badge, Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Song } from 'types/core';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

const SongDisplay = ({
  song,
  cookingMethod,
}: {
  song: Song;
  cookingMethod: string;
}) => {
  const songColors = getColorByDifficulty(song.difficulty);
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px');
  return (
    <Flex
      maxW="100%"
      mb={8}
      mr={8}
      overflow="hidden"
      borderWidth={2}
      borderRadius="lg"
      borderColor={songColors.border}
      boxShadow={`${defaultPixel * 1.5}px ${defaultPixel * 1.5}px 0 ${
        songColors.shadow
      }`}
      transition="box-shadow 300ms ease-in-out"
      _hover={{
        boxShadow: `${defaultPixel * -1.5}px ${defaultPixel * 1.5}px 0 ${
          songColors.shadow
        }`,
      }}
      w="100%"
    >
      <Image src={getAssetUrl(song.image128)} h="100%" />
      <Box mt={2} ml={2} textAlign="left" w={{ base: '55%', md: '65%' }}>
        <Text
          fontWeight="bold"
          fontSize="md"
          color={songColors.shadow}
          lineHeight={1}
        >
          Play to {cookingMethod} your ingredients
        </Text>
        <Text
          fontWeight="bold"
          fontSize={isSmallerThan1024 ? 'md' : 'lg'}
          isTruncated
        >
          {song.name}
        </Text>
        <Text color="gray" mt={-1} mb={1}>
          {song.artist}
        </Text>
        <Badge colorScheme="gray" mb={2} mr={1}>
          Level {song.level}
        </Badge>
        <Badge colorScheme={songColors.badge} mb={2}>
          {song.difficulty}
        </Badge>
      </Box>
    </Flex>
  );
};

export default SongDisplay;
