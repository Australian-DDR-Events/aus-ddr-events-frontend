import { Center, Container, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  IndividualSongLeaderboardFragment,
  useGetSongDifficultyWithScoresForIdQuery,
} from 'types/graphql.generated';
import { useLocation } from 'wouter';

import SongLeaderboardView from './song-leaderboard-view';

const SongLeaderboard = ({
  songDifficultyId,
}: {
  songDifficultyId: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [
    songDifficulty,
    setSongDifficulty,
  ] = useState<IndividualSongLeaderboardFragment>();

  const [, setLocation] = useLocation();
  const [result] = useGetSongDifficultyWithScoresForIdQuery({
    variables: { songDifficultyId },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    if (!result || result.fetching || !result.data) return;
    const songDifficultyByIdData = result.data.songDifficultyById;
    setSongDifficulty(songDifficultyByIdData!);
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
        songDifficulty={songDifficulty!}
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
