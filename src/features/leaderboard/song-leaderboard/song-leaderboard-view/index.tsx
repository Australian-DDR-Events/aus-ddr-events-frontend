import { Center } from '@chakra-ui/react';
import React from 'react';

import ScoreImageModal from '../../score-image-modal';
import SongBanner from '../song-banner';

const SongLeaderboardView = ({
  songDifficulty,
  modalUrl,
  modalIsOpen,
  setModalIsOpen,
  setModalUrl,
  setLocation,
}: {
  songDifficulty: undefined;
  modalUrl: string;
  modalIsOpen: boolean;
  setModalIsOpen: Function;
  setModalUrl: Function;
  setLocation: Function;
}) => {
  return (
    <>
      {setModalUrl}
      {setLocation}
      <Center>
        <SongBanner songDifficulty={songDifficulty} />
      </Center>
      <ScoreImageModal
        imageUrl={modalUrl}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />

      {/* <Center mb={4}>
        {songDifficulty.dancerTopScores.length && (
          <TopScore
            onClickImage={() => {
              setModalUrl(
                getAssetUrl(songDifficulty.dancerTopScores[0].imageUrl),
              );
              setModalIsOpen(true);
            }}
            onClickUser={() =>
              setLocation(
                `/profile/${songDifficulty.dancerTopScores[0].dancer.id}`,
              )
            }
            score={songDifficulty.dancerTopScores[0]}
          />
        )}
      </Center> */}
      {/* {songDifficulty.dancerTopScores.slice(1).map((s, index) => (
        <ScoreLine
          key={s.id}
          index={index}
          score={s}
          onClickImage={() => {
            setModalUrl(getAssetUrl(s!.imageUrl));
            setModalIsOpen(true);
          }}
          onClickName={() => setLocation(`/profile/${s.dancer.id}`)}
          color={getColorByDifficulty(songDifficulty.difficulty).shadow}
        />
      ))} */}
    </>
  );
};

export default SongLeaderboardView;
