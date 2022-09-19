export const GetLoginUrl = () => {
  const { CLIENT_ID, PROVIDER } = process.env;

  const params: Record<string, string> = {
    client_id: CLIENT_ID || '',
    redirect_uri: `${window.location.origin}/callback/`,
    response_type: 'code',
  };
  const paramString = new URLSearchParams(params).toString();
  return `${PROVIDER}/login?${paramString}`;
};

export const GetLogoutUrl = () => {
  const { CLIENT_ID, PROVIDER } = process.env;

  const params: Record<string, string> = {
    client_id: CLIENT_ID || '',
    logout_uri: `${window.location.origin}/logout/`,
  };
  const paramString = new URLSearchParams(params).toString();
  return `${PROVIDER}/logout?${paramString}`;
};
