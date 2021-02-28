import styled from 'types/styled-components';
import { Image } from 'antd';

// eslint-disable-next-line import/prefer-default-export
export const JacketDifficulty = styled(Image)`
  &.Expert {
    border: 2px solid lightgreen;
  }

  &.Challenge {
    border: 2px solid purple;
  }
`;
