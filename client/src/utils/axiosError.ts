import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';

export const isAxiosUnprocessableEntityError = <T>(err: unknown): err is AxiosError<T> => {
  return isAxiosError(err) && err.response?.status === HttpStatusCode.UnprocessableEntity;
};
