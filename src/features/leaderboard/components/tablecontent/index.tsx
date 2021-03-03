import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ScoresRepositoryContext } from 'context/scores';
import { DancersRepositoryContext } from 'context/dancer';
import { DefaultAllDancers } from 'context/dancer/constants';
import { DefaultScore, DefaultSummer2021Score } from 'context/scores/constants';
import { Score } from '~/context/scores/types';

const { Column } = Table;

const TableContent = () => {
  const scoresRepo = useContext(ScoresRepositoryContext);
  const dancersRepo = useContext(DancersRepositoryContext);

  const [summer2021Scores, setSummer2021Scores] = useState(
    Array(DefaultSummer2021Score),
  );
  const [scores, setScores] = useState(Array(DefaultScore));
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

  return (
    <>
      {!loading && (
        <Table
          bordered
          size="middle"
          pagination={false}
          dataSource={allDancers.map((dancer) => ({
            dancerName: dancer.ddrName,
            dancerImageUrl: dancer.profilePictureUrl,
            dancerScores: scores
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
        >
          <Column
            width={24}
            title="Dancer Name"
            key="dancerName"
            dataIndex="dancerName"
          />
          <Column
            width={16}
            title="Total Score"
            key="dancerScores"
            dataIndex="dancerScores"
          />
          <Column
            width={16}
            title="Rank"
            key="exscore"
            dataIndex="dancerRank"
          />
        </Table>
      )}
    </>
  );
};

export default TableContent;
