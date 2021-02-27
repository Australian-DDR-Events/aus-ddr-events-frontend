import { Card } from 'antd';
import styled from 'types/styled-components';

/* eslint-disable import/prefer-default-export */
export const IngredientWrapper = styled.div`
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
  padding: 8px;
`;

export const SubmittedIngredientWrapper = styled.div`
  padding: 8px;
`;

export const StyledCard = styled(Card)`
  background-color: rgb(223, 223, 223);
`;

export const StyledCardGrid = styled(Card.Grid)`
  width: 100%;
`;
