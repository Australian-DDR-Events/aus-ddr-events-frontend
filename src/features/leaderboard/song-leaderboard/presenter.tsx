import { Center, Container } from '@chakra-ui/react';
import React from 'react';
import { Score, Song } from 'types/core';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

import ScoreImageModal from '../score-image-modal';
import ScoreLine from './score-line';
import SongBanner from './song-banner';
import TopScore from './top-score';

const SongLeaderboardPresenter = ({
  song,
  scores,
  modalUrl,
  modalIsOpen,
  setModalIsOpen,
  setModalUrl,
  setLocation,
}: {
  song: Song;
  scores: Score[];
  modalUrl: string;
  modalIsOpen: boolean;
  setModalIsOpen: Function;
  setModalUrl: Function;
  setLocation: Function;
}) => {
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
          key={s.id}
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

export default SongLeaderboardPresenter;
