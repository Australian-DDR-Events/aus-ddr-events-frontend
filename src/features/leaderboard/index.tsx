import React from 'react';
import { LeaderboardHeader, LeaderboardWrapper } from './styled';
import TableContent from './components/tablecontent';

const Leaderboard = () => {
  return (
    <LeaderboardWrapper>
      <LeaderboardHeader>Leaderboard</LeaderboardHeader>
      <TableContent />
    </LeaderboardWrapper>
  );
};

export default Leaderboard;
