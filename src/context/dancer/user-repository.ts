import { Result } from 'types/result';
import {
  User,
  UserRepository,
  UserDao,
  ScoreSubmissionRequest,
  Song,
} from './types';

const userRepository = (dao: UserDao): UserRepository => {
  const get = (id: string): Promise<Result<Error, User>> => dao.get(id);

  const update = (user: User): Promise<Result<Error, boolean>> =>
    dao.update(user);

  const submitScore = (
    scoreSubmission: ScoreSubmissionRequest,
  ): Promise<Result<Error, boolean>> => dao.submitScore(scoreSubmission);

  const getSongs = (): Promise<Result<Error, Array<Song>>> => dao.getSongs();

  return { get, update, submitScore, getSongs };
};

export default userRepository;
