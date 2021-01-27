import { Layout } from 'antd';
import styled from '../../types/styled-components';

const { Header, Content } = Layout;

export const WhiteBackgroundLayout = styled.div`
  background: #fff;
  padding: 24px;
  minheight: 360px;
`;

export const StyledContent = styled(Content)`
  margin: 0 16px;
`;

export const StyledHeader = styled(Header)`
  padding: 0;
`;
