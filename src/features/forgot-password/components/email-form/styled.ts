/* eslint-disable import/prefer-default-export */
import { Form } from 'antd';
import styled, { defaultSpacing } from '~/types/styled-components';

export const StyledForm = styled(Form)`
  max-width: ${defaultSpacing * 40}px;
  margin: auto;
`;
