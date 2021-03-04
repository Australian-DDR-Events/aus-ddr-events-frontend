import { Typography } from 'antd';
import styled, { defaultSpacing } from 'types/styled-components';

export const LeaderboardHeader = styled(Typography.Title)``;

export const LeaderboardWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: ${defaultSpacing * 2}px;
`;
