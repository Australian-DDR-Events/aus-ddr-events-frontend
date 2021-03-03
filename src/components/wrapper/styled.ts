import { Button } from 'antd';
import styled from 'types/styled-components';

// eslint-disable-next-line import/prefer-default-export
export const WhiteBackgroundLayout = styled.div`
  background: #fff;
  min-height: 360px;
`;

export const ResponsiveButton = styled.div`
  @media screen and (min-width: 720px) {
    button {
      visibility: hidden;
    }
  }
`