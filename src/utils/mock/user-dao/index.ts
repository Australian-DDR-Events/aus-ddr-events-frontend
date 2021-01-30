import { err, Result } from '../../../types/result';
import { User, DefaultUser } from '../../../context/user';

const userDao = () => {
  let getHook: (id: string) => Promise<Result<Error, User>> = async (): Promise<
    Result<Error, User>
  > => {
    return err(new Error('get hook not overridden'), DefaultUser);
  };

  let updateHook: (
    user: User,
  ) => Promise<Result<Error, boolean>> = async (): Promise<
    Result<Error, boolean>
  > => {
    return err(new Error('update hook not overridden'), false);
  };

  const setGetHook = (f: (id: string) => Promise<Result<Error, User>>) => {
    getHook = f;
  };
  const setUpdateHook = (
    f: (user: User) => Promise<Result<Error, boolean>>,
  ) => {
    updateHook = f;
  };

  const get = async (id: string): Promise<Result<Error, User>> => {
    return getHook(id);
  };

  const update = async (user: User): Promise<Result<Error, boolean>> => {
    return updateHook(user);
  };

  return {
    get,
    update,
    setGetHook,
    setUpdateHook,
  };
};

export default userDao;
