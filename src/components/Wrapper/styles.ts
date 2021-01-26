import { Layout } from 'antd';
import styled from '../../theme';

const { Header, Content } = Layout;

export const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: url('../../assets/logo.png);
`;

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
