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
import { SongsRepositoryContext } from 'context/songs';
import React, { useContext, useEffect, useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { Score, Song } from 'types/core';
import { defaultSpacing } from 'types/styled-components';
import { useLocation } from 'wouter';

import { ScoresRepositoryContext } from '../../context/scores';
import SongDisplay from './song-display';
import SongLeaderboard from './song-leaderboard';

interface SongListing {
  song: Song;
  score: Score | undefined;
}

const Leaderboard = ({ songId }: { songId?: string }) => {
  if (songId) return <SongLeaderboard songId={songId} />;

  const songsRepo = useContext(SongsRepositoryContext);
  const scoresRepo = useContext(ScoresRepositoryContext);
  const [songListing, setSongListing] = useState(new Array<SongListing>());
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  const [isSmallerOrEqualTo425] = useMediaQuery(['(max-width: 425px)']);

  useEffect(() => {
    songsRepo.songsRepositoryInstance.getAll().then((songsResult) => {
      if (songsResult.isOk()) {
        const songIds = songsResult.value.map((s) => s.id);
        scoresRepo.scoresRepositoryInstance
          .getTop(songIds)
          .then((scoresResult) => {
            if (scoresResult.isOk()) {
              setSongListing(
                songsResult.value
                  .map(
                    (song): SongListing => ({
                      song,
                      score: scoresResult.value.find(
                        (s) => s.song?.id === song.id,
                      ),
                    }),
                  )
                  .sort((s1, s2) => s1.song.level - s2.song.level),
              );
            }
          });
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Heading textAlign="center">
        <Icon
          as={FaCrown}
          color="gold"
          mr={defaultSpacing / 4}
          mb={defaultSpacing / 4}
        />
        Leaderboards
      </Heading>
      <Text textAlign="center" fontSize="lg">
        Click or tap the song card for comprehensive leaderboard
      </Text>
      {isLoading ? (
        <Center>
          <Spinner // todo: replace this with proper skeleton structure
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <Container p={defaultSpacing} maxW="100%" w="fit-content">
          <VStack align="stretch" spacing={defaultSpacing / 4}>
            {songListing.map((songListingEntry) => (
              <Box
                key={songListingEntry.song.id}
                onClick={() =>
                  setLocation(`/leaderboard/${songListingEntry.song.id}`)
                }
              >
                <SongDisplay
                  songCoverSize={isSmallerOrEqualTo425 ? '80px' : '120px'}
                  song={songListingEntry.song}
                  score={songListingEntry.score}
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
