import { Card, Image } from 'antd';
import styled from 'types/styled-components';

/* eslint-disable import/prefer-default-export */
export const IngredientWrapper = styled.div`
  padding: 8px;
`;

export const StyledIngredient = styled(Image)`
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
`;

export const StyledCard = styled(Card)`
  background-color: rgb(223, 223, 223);
`;

export const StyledCardGrid = styled(Card.Grid)`
  width: 100%;
`;
