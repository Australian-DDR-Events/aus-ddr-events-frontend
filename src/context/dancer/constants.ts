import { Song, User } from './types';

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

export const DefaultSong: Song = {
  id: '',
  name: '',
  artist: '',
  imageUrl: '',
  difficulty: '',
  level: 0,
};
