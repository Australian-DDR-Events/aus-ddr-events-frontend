import styled from 'types/styled-components';
import { Image } from 'antd';

// eslint-disable-next-line import/prefer-default-export
export const JacketDifficulty = styled(Image)`
  &.Expert {
    border: 3px solid lightgreen;
  }

  &.Challenge {
    border: 3px solid purple;
  }
`;

export const IngredientsContainer = styled.div`
  width: 100%;
`;
