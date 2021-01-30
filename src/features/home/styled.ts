import { Image, Space } from 'antd';
import styled from '../../types/styled-components';

export const HomeWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

export const DarkBackgroundSpace = styled(Space)`
  background: #303030;
  color: #fff;
  width: 100%;
  margin: 20px 0;
  padding: 20px;
`;
export const WhiteBackgroundSpace = styled(Space)`
  width: 100%;
  padding: 20px;
`;
export const LargeWidthImage = styled(Image)`
  max-width: 600px;
`;
