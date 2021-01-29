import styled from '../../types/styled-components';
import { Image, Space } from 'antd';

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
`
export const WhiteBackgroundSpace = styled(Space)`
  width: 100%;
  padding: 20px;
`
export const SmallWidthImage = styled(Image)`
  max-width: 200px;
`
export const MediumWidthImage = styled(Image)`
  max-width: 500px;
`
export const LargeWidthImage = styled(Image)`
  max-width: 600px
`