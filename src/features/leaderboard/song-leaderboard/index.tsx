import { Center, Container, Spinner } from '@chakra-ui/react';
import { DefaultDancer } from 'context/dancer';
import { DefaultScore } from 'context/scores/constants';
import { DefaultSong } from 'context/songs';
import React, { useEffect, useState } from 'react';
import { Score } from 'types/core';
import { useQuery } from 'urql';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';
import { useLocation } from 'wouter';

import ScoreImageModal from '../score-image-modal';
import ScoreLine from './score-line';
import SongBanner from './song-banner';
import TopScore from './top-score';

const SCORES_QUERY = `
query ( $songId: ID!) {
  songById (id:  $songId) {
    name
    artist
    difficulty
    level
    scores {
      dancer {
        id
        ddrName
        ddrCode
        profilePictureTimestamp
      }
      submissionTime
      value
    }
  }
}
`;

type ScoresQueryType = {
  songById: {
    name: string;
    artist: string;
    difficulty: string;
    level: number;
    image128: string;
    scores: [
      {
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

const SongLeaderboard = ({ songId }: { songId: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<Score[]>([]);
  const [song, setSong] = useState(DefaultSong);

  const [, setLocation] = useLocation();
  const [result] = useQuery<ScoresQueryType>({
    query: SCORES_QUERY,
    variables: { songId },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    if (!result || result.fetching || !result.data) return;
    const songByIdData = result.data.songById;
    setSong({
      ...DefaultSong,
      name: songByIdData.name,
      artist: songByIdData.artist,
      difficulty: songByIdData.difficulty,
      level: songByIdData.level,
      image128: songByIdData.image128,
    });
    setScores(
      songByIdData.scores.map((s) => {
        return {
          ...DefaultScore,
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
      <Center>
        <SongBanner song={song} />
      </Center>
      <ScoreImageModal
        imageUrl={modalUrl}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />

      <Center mb={4}>
        {scores[0] && (
          <TopScore
            onClickImage={() => {
              setModalUrl(getAssetUrl(scores[0].imageUrl));
              setModalIsOpen(true);
            }}
            onClickUser={() => setLocation(`/profile/${scores[0].dancer?.id}`)}
            score={scores[0]}
          />
        )}
      </Center>
      {scores.slice(1).map((s, index) => (
        <ScoreLine
          index={index}
          score={s}
          onClickImage={() => {
            setModalUrl(getAssetUrl(s.imageUrl));
            setModalIsOpen(true);
          }}
          onClickName={() => setLocation(`/profile/${s.dancer?.id}`)}
          color={getColorByDifficulty(song.difficulty).shadow}
        />
      ))}
    </Container>
  );
};

export default SongLeaderboard;
