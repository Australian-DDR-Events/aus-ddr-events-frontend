import { Image, Space } from 'antd';
import styled, { defaultSpacing } from '../../types/styled-components';

export const HomeWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

export const DarkBackgroundSpace = styled(Space)`
  background: #303030;
  color: #fff;
  width: 100%;
  padding: ${defaultSpacing * 3}px;
`;

export const WhiteBackgroundSpace = styled(Space)`
  width: 100%;
  padding: ${defaultSpacing * 3}px;
`;
export const LargeWidthImage = styled(Image)`
  max-width: 600px;
`;
