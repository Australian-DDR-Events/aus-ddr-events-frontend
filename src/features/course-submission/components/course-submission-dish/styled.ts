import { Card, Image } from 'antd';
import styled from 'types/styled-components';

export const StyledCard = styled(Card)`
  background-color: rgb(223, 223, 223);
`;

export const StyledUnsubmitted = styled(Image)`
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
`;
