import { Dancer } from './types';

// eslint-disable-next-line import/prefer-default-export
export const DefaultDancer: Dancer = {
  id: '',
  ddrCode: '',
  ddrName: '',
  primaryMachine: '',
  profilePicture: '',
  newProfilePicture: new File([''], 'filename'),
  state: '',
  userName: '',
};
