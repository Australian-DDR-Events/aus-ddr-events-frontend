import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Song } from 'types/core';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

const Index = ({ song }: { song: Song }) => {
  const songColors = getColorByDifficulty(song.difficulty);
  return (
    <Box
      bgColor={songColors.shadow}
      pt={2}
      pb={2}
      pl={4}
      pr={4}
      borderRadius="full"
    >
      <Heading color="white" size="md">
        {song.name} by {song.artist}
      </Heading>
    </Box>
  );
};

export default Index;
