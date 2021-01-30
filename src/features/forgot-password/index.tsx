import React, { useState } from 'react';
import EmailSent from '~/components/email-sent';
import { ForgotPasswordState } from './types';
import EmailForm from '~/components/email-form';

const ForgotPassword = () => {
  const [step, setStep] = useState(ForgotPasswordState.REQUEST_EMAIL);

  const handleEmailSubmitted = () => {
    setStep(ForgotPasswordState.EMAIL_SENT);
  };
  return (
    <>
      {step === ForgotPasswordState.REQUEST_EMAIL && (
        <EmailForm onSubmit={handleEmailSubmitted} />
      )}
      {step === ForgotPasswordState.EMAIL_SENT && <EmailSent />}
    </>
  );
};

export default ForgotPassword;
