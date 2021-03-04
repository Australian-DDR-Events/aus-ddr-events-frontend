import React, { useContext, useEffect, useState } from 'react';
import { Table, Typography, Space, Avatar } from 'antd';
import { ScoresRepositoryContext } from 'context/scores';
import { DancersRepositoryContext } from 'context/dancer';
import { DefaultAllDancers } from 'context/dancer/constants';
import { DefaultScore } from 'context/scores/constants';
import { LeaderboardContainer } from './styled';
import { SongsRepositoryContext } from 'context/songs';
import { DefaultSong } from '~/context/songs/constants';

const { Title } = Typography;

const TableContent = () => {
  const songsRepo = useContext(SongsRepositoryContext);
  const scoresRepo = useContext(ScoresRepositoryContext);
  const dancersRepo = useContext(DancersRepositoryContext);
  const [scores, setScores] = useState(Array(DefaultScore));
  const [songs, setSongs] = useState(Array(DefaultSong));
  const [allDancers, setAllDancers] = useState(Array(DefaultAllDancers));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      dancersRepo.dancersRepositoryInstance.getAll().then((dancersRes) => {
        setAllDancers(dancersRes.okOrDefault());
        setLoading(false);
      });
    }
  });

  useEffect(() => {
    if (allDancers) {
      const scoresPromises = allDancers.map((dancers) =>
        scoresRepo.scoresRepositoryInstance.getAll({ dancerId: [dancers.id] }),
      );
      Promise.all(scoresPromises).then((results) => {
        const ScoresResults = Object.values(results).map((scoresRes) =>
          scoresRes.okOrDefault(),
        );
        const flattenScoresArray = ScoresResults.flat();
        setScores(flattenScoresArray);
        setLoading(false);
      });
    }
  }, [allDancers]);

  const columns = [
    {
      title: ' Dancer Name',
      textWrap: 'word-break',
      ellipsis: true,
      width: 36,
      render: (item) => {
        return (
          <>
            <Space>
              <Avatar
                size={32}
                shape="square"
                src={
                  `${process.env.ASSETS_URL}${item.dancerImageUrl}` ||
                  'https://i.imgur.com/o0ulS6k.png'
                }
              />
              <Title level={4}>{item.dancerName}</Title>
            </Space>
            <p>{item.dancerState}</p>
          </>
        );
      },
    },
    {
      title: 'Total Score',
      dataIndex: 'dancerTotalScores',
      textWrap: 'word-break',
      ellipsis: true,
      width: 16,
      sorter: {
        compare: (a, b) => a.dancerTotalScores - b.dancerTotalScores,
        multiple: 3,
      },
    },
  ];

  return (
    <>
      {!loading && (
        <LeaderboardContainer>
          <Table
            bordered
            size="middle"
            pagination={false}
            dataSource={allDancers.map((dancer) => ({
              dancerCode: dancer.ddrCode,
              dancerState: dancer.state,
              dancerName: dancer.ddrName,
              dancerImageUrl: dancer.profilePictureUrl,
              dancerTotalScores: scores
                .map((score) => {
                  if (dancer.id === score.dancerId) {
                    if (score.value !== undefined) {
                      return score.value;
                    }
                  }
                  return 0;
                })
                .reduce((acc: number, cur: number) => {
                  return acc + cur;
                }, 0),
            }))}
            columns={columns}
          />
        </LeaderboardContainer>
      )}
    </>
  );
};

export default TableContent;
