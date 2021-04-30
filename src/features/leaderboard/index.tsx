import {
  Box,
  Center,
  Container,
  Heading,
  Icon,
  Spinner,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { FaCrown } from '@react-icons/all-files/fa/FaCrown';
import React, { useState } from 'react';
import {
  AllSongDifficultiesLeaderboardFragment,
  useGetSongsForLeaderboardListingQuery,
} from 'types/graphql.generated';
import { useLocation } from 'wouter';

import SongDisplay from './song-display';
import SongLeaderboard from './song-leaderboard';

const Leaderboard = ({ songDifficultyId }: { songDifficultyId?: string }) => {
  if (songDifficultyId)
    return <SongLeaderboard songDifficultyId={songDifficultyId} />;

  const [songDifficulties, setSongDifficulties] = useState<
    AllSongDifficultiesLeaderboardFragment[]
  >([]);
  const [, setLocation] = useLocation();

  const [{ data, fetching }] = useGetSongsForLeaderboardListingQuery();

  const [isSmallerOrEqualTo425] = useMediaQuery(['(max-width: 425px)']);

  if (data?.songDifficulties?.nodes) {
    setSongDifficulties(data.songDifficulties.nodes);
  }

  return (
    <>
      <Heading textAlign="center">
        <Icon as={FaCrown} color="gold" mr={2} mb={2} />
        Leaderboards
      </Heading>
      <Text textAlign="center" fontSize="lg">
        Click or tap the song card for comprehensive leaderboard
      </Text>
      {fetching ? (
        <Center>
          <Spinner // todo: replace this with proper skeleton structure
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mt={4}
          />
        </Center>
      ) : (
        <Container p={8} maxW="100%" w="fit-content">
          <VStack align="stretch" spacing={2}>
            {songDifficulties.map((songDifficulty) => (
              <Box
                key={songDifficulty.id}
                onClick={() => setLocation(`/leaderboard/${songDifficulty.id}`)}
              >
                <SongDisplay
                  songCoverSize={isSmallerOrEqualTo425 ? '80px' : '120px'}
                  songDifficulty={songDifficulty}
                />
              </Box>
            ))}
          </VStack>
        </Container>
      )}
    </>
  );
};

export default Leaderboard;
