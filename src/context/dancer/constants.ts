import { AllDancers, Dancer } from './types';

// eslint-disable-next-line import/prefer-default-export
export const DefaultDancer: Dancer = {
  id: '',
  dancerId: '',
  dancerName: '',
  primaryMachine: '',
  profilePicture: '',
  newProfilePicture: new File([''], 'filename'),
  state: '',
  userName: '',
};

export const DefaultAllDancers: AllDancers = {
  id: '',
  authenticationId: '',
  ddrName: '',
  ddrCode: '',
  primaryMachineLocation: '',
  profilePictureUrl: '',
  state: '',
};