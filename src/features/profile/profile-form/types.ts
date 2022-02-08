import { DancerResponse } from '../types';

type ProfileFormData = DancerResponse;
interface UpdateProfileData {
  ddrName: string;
  ddrCode: string;
  primaryMachineLocation: string;
  state: string;
}

export { ProfileFormData, UpdateProfileData };
