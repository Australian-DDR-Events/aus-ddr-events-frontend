import { SongsRepositoryContext } from 'context/songs';
import React, { useContext, useEffect, useState } from 'react';
import { Song } from 'types/core';

import SongLeaderboard from './components/song-leaderboard';

const Leaderboard = ({ songId }: { songId?: string }) => {
  if (songId) return <SongLeaderboard songId={songId} />;

  const songsRepo = useContext(SongsRepositoryContext);
  const [songs, setSongs] = useState(new Array<Song>());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    songsRepo.songsRepositoryInstance.getAll().then((result) => {
      if (result.isOk()) setSongs(result.value);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <></>
  ) : (
    <div>
      {songs.map((song) => (
        <div>{song.id}</div>
      ))}
    </div>
  );
};

export default Leaderboard;
