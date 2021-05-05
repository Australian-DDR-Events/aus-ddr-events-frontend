import { Center, Container, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import { useGetSongDifficultyWithScoresForIdQuery } from './operation.generated';
import SongLeaderboardView from './song-leaderboard-view';

const SongLeaderboard = ({
  songDifficultyId,
}: {
  songDifficultyId: string;
}) => {
  const [, setLocation] = useLocation();
  const [{ data, fetching }] = useGetSongDifficultyWithScoresForIdQuery({
    variables: { songDifficultyId },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  if (fetching) {
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
        songDifficulty={data?.songDifficultyById!}
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
