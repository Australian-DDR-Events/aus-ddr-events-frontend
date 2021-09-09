import { Center, Container, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import SongLeaderboardView from './song-leaderboard-view';

const SongLeaderboard = ({
  songDifficultyId,
}: {
  songDifficultyId: string;
}) => {
  const [, setLocation] = useLocation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  const fetching = true;
  const data = undefined;

  if (fetching) {
    return (
      <Center>
        {songDifficultyId}
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
        songDifficulty={data}
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
