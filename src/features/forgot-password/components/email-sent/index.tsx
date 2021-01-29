import React from 'react';
import { Result } from 'antd';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EmailSentWrapper } from './styled';

const EmailSent = () => {
  return (
    <EmailSentWrapper>
      <Result
        icon={<FontAwesomeIcon icon={faEnvelopeOpenText} size="10x" />}
        title="Check your email "
        subTitle="We have sent a password recover instruction to your email."
      />
    </EmailSentWrapper>
  );
};

export default EmailSent;
