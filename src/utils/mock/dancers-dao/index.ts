import { Dancer, DancersDao, DefaultDancer } from 'context/dancer';
import { err, Result } from 'types/result';

interface TestingDancersDao extends DancersDao {
  setGetHook: (f: (id: string) => Promise<Result<Error, Dancer>>) => void;
  setUpdateHook: (f: (user: Dancer) => Promise<Result<Error, boolean>>) => void;
}

const dancersTestingDao = (): TestingDancersDao => {
  let getHook: (id: string) => Promise<Result<Error, Dancer>> =
    async (): Promise<Result<Error, Dancer>> => {
      return err(new Error('get hook not overridden'), DefaultDancer);
    };

  let updateHook: (user: Dancer) => Promise<Result<Error, boolean>> =
    async (): Promise<Result<Error, boolean>> => {
      return err(new Error('update hook not overridden'), false);
    };

  const setGetHook = (f: (id: string) => Promise<Result<Error, Dancer>>) => {
    getHook = f;
  };
  const setUpdateHook = (
    f: (user: Dancer) => Promise<Result<Error, boolean>>,
  ) => {
    updateHook = f;
  };

  const get = async (id: string): Promise<Result<Error, Dancer>> => {
    return getHook(id);
  };

  const update = async (user: Dancer): Promise<Result<Error, boolean>> => {
    return updateHook(user);
  };

  return {
    get,
    update,
    setGetHook,
    setUpdateHook,
  };
};

export default dancersTestingDao;
