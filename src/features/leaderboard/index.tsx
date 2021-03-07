import { Container, Grid, GridItem } from '@chakra-ui/react';
import { SongsRepositoryContext } from 'context/songs';
import React, { useContext, useEffect, useState } from 'react';
import { Score, Song } from 'types/core';
import { useLocation } from 'wouter';

import { ScoresRepositoryContext } from '../../context/scores';
import SongDisplay from './components/song-display';
import SongLeaderboard from './components/song-leaderboard';

interface SongListing {
  song: Song;
  score: Score | undefined;
}

const Leaderboard = ({ songId }: { songId?: string }) => {
  if (songId) return <SongLeaderboard songId={songId} />;

  const songsRepo = useContext(SongsRepositoryContext);
  const scoresRepo = useContext(ScoresRepositoryContext);
  const [songListing, setSongListing] = useState(new Array<SongListing>());
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    songsRepo.songsRepositoryInstance.getAll().then((songsResult) => {
      if (songsResult.isOk()) {
        const songIds = songsResult.value.map((s) => s.id);
        scoresRepo.scoresRepositoryInstance
          .getTop(songIds)
          .then((scoresResult) => {
            if (scoresResult.isOk()) {
              setSongListing(
                songsResult.value
                  .map(
                    (song): SongListing => ({
                      song,
                      score: scoresResult.value.find(
                        (s) => s.song?.id === song.id,
                      ),
                    }),
                  )
                  .sort((s1, s2) => s1.song.level - s2.song.level),
              );
            }
          });
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <></>
  ) : (
    <Container>
      <Grid h="80px">
        {songListing.map((songListingEntry) => (
          <GridItem
            key={songListingEntry.song.id}
            onClick={() =>
              setLocation(`/leaderboard/${songListingEntry.song.id}`)
            }
          >
            <SongDisplay
              song={songListingEntry.song}
              score={songListingEntry.score}
            />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Leaderboard;
