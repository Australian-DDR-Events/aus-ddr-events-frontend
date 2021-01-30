import styled from 'types/styled-components';

// eslint-disable-next-line import/prefer-default-export
export const FontAwesomeButton = styled.a`
  width: 80px;
  height: 80px;
  color: ${(props) => props.iconColor || 'palevioletred'};
`;
