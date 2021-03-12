import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Score } from 'types/core';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';
import { useLocation } from 'wouter';

const SongScoreDisplay = ({ score }: { score: Score }) => {
  const { song } = score;

  if (!song) <></>; // TODO Display a proper error box here

  const songColors = getColorByDifficulty(song!.difficulty);
  const [, setLocation] = useLocation();
  return (
    <Flex
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
    >
      <Image
        src={getAssetUrl(song!.image128)}
        w={{ base: '96px', md: '128px' }}
        h={{ base: '96px', md: '128px' }}
      />
      <Box ml={4} textAlign="left">
        <Text
          fontWeight="bold"
          fontSize="lg"
          w={{ base: '196px', md: '320px' }}
          isTruncated
          mr={2}
          mt={2}
        >
          {song!.name}
        </Text>
        <Badge colorScheme="gray" mr={1} mt={-2}>
          Level {song!.level}
        </Badge>
        <Badge colorScheme={songColors.badge} mt={-2}>
          {song!.difficulty}
        </Badge>
        <Text fontSize="2xl">{score.value}</Text>
      </Box>
    </Flex>
  );
};

export default SongScoreDisplay;
