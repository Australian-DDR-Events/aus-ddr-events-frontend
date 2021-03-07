import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Song } from 'types/core';
import { defaultSpacing } from 'types/styled-components';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

const Index = ({ song }: { song: Song }) => {
  const songColors = getColorByDifficulty(song.difficulty);
  return (
    <Box
      bgColor={songColors.shadow}
      pt={defaultSpacing / 4}
      pb={defaultSpacing / 4}
      pl={defaultSpacing / 2}
      pr={defaultSpacing / 2}
      borderRadius="full"
    >
      <Heading color="white" size="md">
        {song.name} by {song.artist}
      </Heading>
    </Box>
  );
};

export default Index;
