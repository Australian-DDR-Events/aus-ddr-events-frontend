import useSWRDelete from 'hooks/use-swr-delete';
import useSWRPost from 'hooks/use-swr-post';

type LoginConnectionResult = [loading: boolean, success: boolean];

const useLoginConnection = (code: string): LoginConnectionResult => {
  const params = new URLSearchParams(`code=${code}`);
  const { error, isValidating } = useSWRPost<void>('/connections/login', {
    queryParams: params,
  });

  if (isValidating) return [true, false];
  return [false, error === undefined];
};

type LogoutConnectionResult = [loading: boolean];

const useLogoutConnection = (): LogoutConnectionResult => {
  const { isValidating } = useSWRDelete<void>('/connections/logout');

  return [isValidating];
};

export { useLoginConnection, useLogoutConnection };
