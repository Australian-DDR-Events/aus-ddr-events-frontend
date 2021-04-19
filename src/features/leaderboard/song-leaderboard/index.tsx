import { Center, Container, Spinner } from '@chakra-ui/react';
import { DefaultDancer } from 'context/dancer';
import { DefaultScore } from 'context/scores/constants';
import { DefaultSong } from 'context/songs';
import React, { useEffect, useState } from 'react';
import { Score } from 'types/core';
import { useQuery } from 'urql';
import { useLocation } from 'wouter';

import SongLeaderboardView from './song-leaderboard-view';

const SCORES_QUERY = `
query ($songDifficultyId: ID!) {
  songDifficultyById (id: $songDifficultyId) {
    difficulty
    level
    song {
      name
      artist
      image256
    }
    dancerTopScores (order: {
      value: DESC
      submissionTime: DESC
    }) {
      dancer {
        id
        ddrName
        ddrCode
        profilePictureTimestamp
      }
      id
      imageUrl
      value
    }
  }
}
`;

type ScoresQueryType = {
  songDifficultyById: {
    difficulty: string;
    level: number;
    song: {
      name: string;
      artist: string;
      image256: string;
    };
    dancerTopScores: [
      {
        id: string;
        value: number;
        submissionTime: string;
        imageUrl: string;
        dancer: {
          id: string;
          ddrName: string;
          ddrCode: string;
          profilePictureTimestamp: string;
        };
      },
    ];
  };
};

const SongLeaderboard = ({
  songDifficultyId,
}: {
  songDifficultyId: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<Score[]>([]);
  const [song, setSong] = useState(DefaultSong);

  const [, setLocation] = useLocation();
  const [result] = useQuery<ScoresQueryType>({
    query: SCORES_QUERY,
    variables: { songDifficultyId },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    if (!result || result.fetching || !result.data) return;
    const songDifficultyByIdData = result.data.songDifficultyById;
    setSong({
      ...DefaultSong,
      name: songDifficultyByIdData.song.name,
      artist: songDifficultyByIdData.song.artist,
      difficulty: songDifficultyByIdData.difficulty,
      level: songDifficultyByIdData.level,
      image256: songDifficultyByIdData.song.image256,
    });
    setScores(
      songDifficultyByIdData.dancerTopScores.map((s) => {
        return {
          ...DefaultScore,
          id: s.id,
          value: s.value,
          submissionTime: s.submissionTime,
          imageUrl: s.imageUrl,
          dancer: {
            ...DefaultDancer,
            id: s.dancer.id,
            ddrName: s.dancer.ddrName,
            code: s.dancer.ddrCode,
          },
        };
      }),
    );
    setIsLoading(false);
  }, [result]);

  if (isLoading) {
    return (
      <Center>
        <Spinner // todo: replace this with proper skeleton structure
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Container maxW="100%" w="fit-content">
      <SongLeaderboardView
        song={song}
        scores={scores}
        modalUrl={modalUrl}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setModalUrl={setModalUrl}
        setLocation={setLocation}
      />
    </Container>
  );
};

export default SongLeaderboard;
