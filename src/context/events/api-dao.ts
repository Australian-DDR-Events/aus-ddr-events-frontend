import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { err, ok, Result } from 'types/result';

import { Event, EventsDao } from './types';

const eventsApiDao = ({
  axiosClient,
}: {
  axiosClient: AxiosInstance;
}): EventsDao => {
  const getAll = async (
    active_only: boolean,
  ): Promise<Result<Error, Array<Event>>> => {
    const axiosRequest: AxiosRequestConfig = {
      params: {
        active_only,
      },
    };

    return axiosClient
      .get(`/events`, axiosRequest)
      .then(
        (response: AxiosResponse<Array<Event>>): Result<Error, Array<Event>> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Array<Event>> => {
          return err(new Error('failed to get events'), new Array<Event>());
        },
      );
  };

  return { getAll };
};

export default eventsApiDao;
