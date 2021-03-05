import styled from 'types/styled-components';

export const WhiteBackgroundLayout = styled.div`
  min-height: 360px;
`;

export const ResponsiveButton = styled.div`
  @media screen and (min-width: 720px) {
    button {
      visibility: hidden;
    }
  }
`;
