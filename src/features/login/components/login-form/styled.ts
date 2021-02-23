import { Form } from 'antd';
import styled, { defaultSpacing } from 'types/styled-components';

export const LoginFormForgot = styled.a`
  float: right;
`;

export const StyledForm = styled(Form)`
  max-width: ${defaultSpacing * 40}px;
  margin: auto;
  padding-top: 32px;
`;
