import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { IndividualSongLeaderboardFragment } from 'types/graphql.generated';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

const Index = ({
  songDifficulty,
}: {
  songDifficulty: IndividualSongLeaderboardFragment;
}) => {
  const songColors = getColorByDifficulty(songDifficulty.difficulty);
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
        {songDifficulty.song?.name} by {songDifficulty.song?.artist}
      </Heading>
    </Box>
  );
};

export default Index;
