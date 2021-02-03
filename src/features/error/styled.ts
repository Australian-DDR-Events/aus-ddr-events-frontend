import { Typography, Image } from 'antd';
import styled, { defaultSpacing } from 'types/styled-components';

export const ErrorHeader = styled(Typography.Title)`
  font-size: 32px;
`;

export const ErrorWrapper = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  padding: ${defaultSpacing * 16}px;
`;

export const LargeWidthImage = styled(Image)`
  width: 72px;
  margin: 8px;
`;
