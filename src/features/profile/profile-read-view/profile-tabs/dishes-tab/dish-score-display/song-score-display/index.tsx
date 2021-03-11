import { Badge, Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Score } from 'types/core';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';
import { useLocation } from 'wouter';

// DON'T DELETE THIS...
const SongScoreDisplay = ({ score }: { score: Score }) => {
  const { song } = score;

  if (!song) <></>; // TODO Display a proper error box here

  const songColors = getColorByDifficulty(song!.difficulty);
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px');
  const [, setLocation] = useLocation();
  return (
    <Flex
      // maxW={isSmallerThan1024 ? '100%' : 'fit-content'}
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
      cursor="pointer"
      onClick={() => setLocation(`/leaderboard/${song!.id}`)}
      {...(isSmallerThan1024 && { w: '100%' })}
    >
      <Image
        src={getAssetUrl(song!.image64)}
        // h={isSmallerThan1024 ? '95px' : '128px'}
      />
      <Box ml={4} textAlign="left">
        <Text fontWeight="bold" fontSize="lg" mt={2}>
          {song!.name}
        </Text>
        <Text color="gray" mt={-1} mb={1}>
          {song!.artist}
        </Text>
        <Badge colorScheme="gray" mb={2} mr={1}>
          Level {song!.level}
        </Badge>
        <Badge colorScheme={songColors.badge} mb={2}>
          {song!.difficulty}
        </Badge>
      </Box>
      <Box mt={2} ml={2} textAlign="left">
        <Text fontWeight="bold">EX score</Text>
        <Text
          fontSize={isSmallerThan1024 ? 'md' : 'xl'}
          mt={isSmallerThan1024 ? -2 : 0}
        >
          {score.value}
        </Text>
      </Box>
    </Flex>
  );
};

export default SongScoreDisplay;
