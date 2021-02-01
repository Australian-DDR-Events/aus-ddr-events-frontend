import styled from 'types/styled-components';
import { Image } from 'antd';

// eslint-disable-next-line import/prefer-default-export
export const JacketDifficulty = styled(Image)`
  width: 144px;

  &.Expert {
    border: 4px solid lightgreen;
  }

  &.Challenge {
    border: 4px solid purple;
  }
`;
