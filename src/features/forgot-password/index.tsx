import React, { useState } from 'react';

import EmailSent from './email-sent';
import { ForgotPasswordState } from './types';

const ForgotPassword = () => {
  const [step] = useState(ForgotPasswordState.REQUEST_EMAIL);

  return <>{step === ForgotPasswordState.EMAIL_SENT && <EmailSent />}</>;
};

export default ForgotPassword;
