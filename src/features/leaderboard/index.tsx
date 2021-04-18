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
  songs {
    nodes {
      id
      name
      artist
      image128
      songDifficulties {
        id
        difficulty
        level
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
}
`;

type SongsQueryNode = {
  id: string;
  name: string;
  artist: string;
  image128: string;
  songDifficulties: [
    {
      id: string;
      difficulty: string;
      level: number;
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

type SongsQueryType = {
  songs: {
    nodes: SongsQueryNode[];
  };
};

const SplitSong = ({ songNode }: { songNode: SongsQueryNode }): SongListing[] =>
  songNode.songDifficulties.map((songDifficulty) => {
    let response: SongListing = {
      song: {
        ...DefaultSong,
      },
      score: undefined,
    };
    response.song = {
      ...DefaultSong,
      id: songDifficulty.id,
      name: songNode.name,
      artist: songNode.artist,
      difficulty: songDifficulty.difficulty,
      level: songDifficulty.level,
      image128: songNode.image128,
    };
    if (songDifficulty.topScore) {
      response = {
        ...response,
      };
      response.score = {
        ...DefaultScore,
        id: songDifficulty.topScore.id,
        value: songDifficulty.topScore.value,
        submissionTime: songDifficulty.topScore.submissionTime,
        imageUrl: songDifficulty.topScore.imageUrl,
        dancer: {
          ...DefaultDancer,
          id: songDifficulty.topScore.dancer.id,
          ddrName: songDifficulty.topScore.dancer.ddrName,
          profilePictureUrl: songDifficulty.topScore.dancer.profilePictureUrl,
        },
      };
    }
    return response;
  });

const Leaderboard = ({ songDifficultyId }: { songDifficultyId?: string }) => {
  if (songDifficultyId)
    return <SongLeaderboard songDifficultyId={songDifficultyId} />;

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
    const mappedSongListings = songs.map((s) => SplitSong({ songNode: s }));
    setSongListing(new Array<SongListing>().concat(...mappedSongListings));
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
