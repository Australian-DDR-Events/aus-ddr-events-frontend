import { Result } from 'antd';
import React from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';

import { EmailSentWrapper } from './styled';

const EmailSent = () => (
  <EmailSentWrapper>
    <Result
      icon={<FaEnvelopeOpenText />}
      title="Check your email "
      subTitle="We have sent a password recover instruction to your email."
    />
  </EmailSentWrapper>
);

export default EmailSent;
