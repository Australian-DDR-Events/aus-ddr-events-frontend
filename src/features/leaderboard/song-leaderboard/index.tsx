import { Center, Container, List } from '@chakra-ui/react';
import { ScoresRepositoryContext } from 'context/scores';
import { DefaultSong, SongsRepositoryContext } from 'context/songs';
import React, { useContext, useEffect, useState } from 'react';
import { Score } from 'types/core';
import { getAssetUrl } from 'utils/assets';
import { useLocation } from 'wouter';

import ScoreImageModal from '../score-image-modal';
import ScoreLine from './score-line';
import SongBanner from './song-banner';
import TopScore from './top-score';

const SongLeaderboard = ({ songId }: { songId: string }) => {
  const songsRepo = useContext(SongsRepositoryContext);
  const scoresRepo = useContext(ScoresRepositoryContext);

  const [isLoading, setIsLoading] = useState(true);
  const [song, setSong] = useState(DefaultSong);
  const [scores, setScores] = useState(new Array<Score>());

  const [, setLocation] = useLocation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    songsRepo.songsRepositoryInstance.getById(songId).then((result) => {
      if (result.isOk()) setSong(result.value);
    });
    scoresRepo.scoresRepositoryInstance
      .getAll({
        songId: new Array<string>(songId),
      })
      .then((result) => {
        if (result.isOk())
          setScores(result.value.sort((s1, s2) => s2.value - s1.value));
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <></>;

  return (
    <Container maxW="container.xl">
      <Center>
        <SongBanner song={song} />
      </Center>
      <ScoreImageModal
        imageUrl={modalUrl}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
      <Center mb={4}>{scores[0] && <TopScore score={scores[0]} />}</Center>
      <List>
        {scores.map((s, index) => (
          <ScoreLine
            index={index}
            score={s}
            onClickImage={() => {
              setModalUrl(getAssetUrl(s.imageUrl));
              setModalIsOpen(true);
            }}
            onClickName={() => setLocation(`/profile/${s.dancer?.id}`)}
          />
        ))}
      </List>
    </Container>
  );
};

export default SongLeaderboard;
