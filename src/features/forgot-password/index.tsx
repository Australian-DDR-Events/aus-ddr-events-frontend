import React, { useState } from 'react';

import EmailSent from './components/email-sent';
import EmailForm from './email-form';
import { ForgotPasswordState } from './types';

const ForgotPassword = () => {
  const [step, setStep] = useState(ForgotPasswordState.REQUEST_EMAIL);

  const handleEmailSubmitted = () => {
    setStep(ForgotPasswordState.EMAIL_SENT);
  };
  return (
    <>
      {step === ForgotPasswordState.REQUEST_EMAIL && (
        <EmailForm onSubmitCallback={handleEmailSubmitted} />
      )}
      {step === ForgotPasswordState.EMAIL_SENT && <EmailSent />}
    </>
  );
};

export default ForgotPassword;
