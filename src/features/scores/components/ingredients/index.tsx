import React, { useContext, useEffect, useState } from 'react';
import { Space, Card, Typography, Image, Skeleton, Divider } from 'antd';
import { DefaultSong, SongsRepositoryContext } from 'context/songs';
import { JacketDifficulty } from './styled';

const { Text, Paragraph } = Typography;

const Ingredient = () => {
  const songsRepository = useContext(SongsRepositoryContext);
  const [songs, setSongs] = useState(DefaultSong);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    songsRepository.songsRepositoryInstance.getAll().then((e) => {
      setSongs(e.okOrDefault());
      setLoading(false);
    });
  }, []);

  const songsConvert = Object.values(songs).map((song) => {
    return (
      <>
        {isLoading && (
          <>
            <Skeleton active />
          </>
        )}
        {!isLoading && (
          <Space>
            <Card
              style={{ width: '240px', height: '480px' }}
              type="inner"
              title="Ingredient Name"
            >
              <Image src="#" alt="ingredient image" />
              <Divider />
              <JacketDifficulty
                className={song.difficulty}
                width={160}
                src={song.imageUrl}
                alt="songjacket"
              />
              <Paragraph>
                <Text>{song.name}</Text>
                <Text type="secondary">[{song.artist}]</Text>
              </Paragraph>
              <Paragraph>
                <Text>EX Score</Text>
              </Paragraph>
              <Paragraph>
                <Text>Rank: []</Text>
              </Paragraph>
            </Card>
          </Space>
        )}
      </>
    );
  });

  return <>{songsConvert}</>;
};
export default Ingredient;
