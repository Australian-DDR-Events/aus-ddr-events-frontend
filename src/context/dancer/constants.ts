import { User } from './types';

// eslint-disable-next-line import/prefer-default-export
export const DefaultUser: User = {
  id: '',
  dancerId: '',
  dancerName: '',
  primaryMachine: '',
  profilePicture: '',
  newProfilePicture: new File([''], 'filename'),
  state: '',
  userName: '',
};
