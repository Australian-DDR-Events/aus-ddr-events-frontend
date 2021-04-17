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
import { DefaultDancer } from 'context/dancer';
import { DefaultScore } from 'context/scores/constants';
import { DefaultSong } from 'context/songs';
import React, { useEffect, useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { Score, Song } from 'types/core';
import { useQuery } from 'urql';
import { useLocation } from 'wouter';

import SongDisplay from './song-display';
import SongLeaderboard from './song-leaderboard';

interface SongListing {
  song: Song;
  score: Score | undefined;
}

const SONGS_QUERY = `
{
  songs (order: {
    level: ASC
  }) {
    nodes {
      id
      name
      artist
      difficulty
      level
      image128
      topScore {
        dancer {
          id
          ddrName
          ddrCode
          profilePictureUrl
        }
        id
        imageUrl
        value
      }
    }
  }
}
`;

type SongsQueryType = {
  songs: {
    nodes: [
      {
        id: string;
        name: string;
        artist: string;
        difficulty: string;
        level: number;
        image128: string;
        topScore: {
          id: string;
          value: number;
          submissionTime: string;
          imageUrl: string;
          dancer: {
            id: string;
            ddrName: string;
            ddrCode: string;
            profilePictureUrl: string;
          };
        };
      },
    ];
  };
};

const Leaderboard = ({ songId }: { songId?: string }) => {
  if (songId) return <SongLeaderboard songId={songId} />;

  const [songListing, setSongListing] = useState(new Array<SongListing>());
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  const [result] = useQuery<SongsQueryType>({
    query: SONGS_QUERY,
  });

  const [isSmallerOrEqualTo425] = useMediaQuery(['(max-width: 425px)']);

  useEffect(() => {
    if (!result || result.fetching || !result.data) return;
    const songs = result.data.songs.nodes;
    setSongListing(
      songs.map((s) => {
        return {
          song: {
            ...DefaultSong,
            id: s.id,
            name: s.name,
            artist: s.artist,
            difficulty: s.difficulty,
            level: s.level,
            image128: s.image128,
          },
          score: {
            ...DefaultScore,
            id: s.topScore.id,
            value: s.topScore.value,
            submissionTime: s.topScore.submissionTime,
            imageUrl: s.topScore.imageUrl,
            dancer: {
              ...DefaultDancer,
              id: s.topScore.dancer.id,
              ddrName: s.topScore.dancer.ddrName,
              profilePictureUrl: s.topScore.dancer.profilePictureUrl,
            },
          },
        };
      }),
    );
    setIsLoading(false);
  }, [result]);

  return (
    <>
      <Heading textAlign="center">
        <Icon as={FaCrown} color="gold" mr={2} mb={2} />
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
            mt={4}
          />
        </Center>
      ) : (
        <Container p={8} maxW="100%" w="fit-content">
          <VStack align="stretch" spacing={2}>
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
