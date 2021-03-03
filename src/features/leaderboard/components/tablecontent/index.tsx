import React, { useContext, useEffect, useState } from 'react';
import { ScoresRepositoryContext } from 'context/scores';
import { DancersRepositoryContext, DefaultDancer } from 'context/dancer';
import { DefaultSummer2021Score } from '~/context/scores/constants';
import { Table } from 'antd';

const { Column } = Table;

const TableContent = () => {
  const scoresRepo = useContext(ScoresRepositoryContext);
  const dancersRepo = useContext(DancersRepositoryContext);

  const [scores, setScores] = useState(DefaultSummer2021Score);
  const [dancers, setDancers] = useState(Array(DefaultDancer));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      dancersRepo.dancersRepositoryInstance.getAll().then((dancersRes) => {
        setDancers(dancersRes.okOrDefault());
        setLoading(false);
      });
    }
  });

  console.log(dancers);

  return <div>asd</div>;
};

export default TableContent;
