import { Typography } from 'antd';
import styled, { defaultSpacing } from 'types/styled-components';

export const ProfileHeader = styled(Typography.Title)`
  margin-bottom: -8px !important;
`;

export const ProfileWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: ${defaultSpacing * 2}px;
`;
