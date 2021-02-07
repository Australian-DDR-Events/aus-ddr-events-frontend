import { Result } from 'types/result';
import { User, UserRepository, UserDao, ScoreSubmissionRequest } from './types';

const userRepository = (dao: UserDao): UserRepository => {
  const get = (id: string): Promise<Result<Error, User>> => dao.get(id);

  const update = (user: User): Promise<Result<Error, boolean>> =>
    dao.update(user);

  const submitScore = (
    scoreSubmission: ScoreSubmissionRequest,
  ): Promise<Result<Error, boolean>> => dao.submitScore(scoreSubmission);

  return { get, update, submitScore };
};

export default userRepository;
