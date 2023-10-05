import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { AuthResponse } from 'src/types/auth.type';
import { http } from 'src/utils/http';

type UserLoginParams = {
  email: string;
  password: string;
};

type UserLoginResponse = {
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  mutate: UseMutateFunction<AuthResponse, Error, UserLoginParams, unknown>;
  data?: AuthResponse;
};

export const useMutateUserLogin = (): UserLoginResponse => {
  const { mutate, isLoading, isError, error, data } = useMutation<AuthResponse, Error, UserLoginParams>({
    mutationFn: async (userInfo: UserLoginParams) => {
      const res = await http.post('/login', userInfo);

      return res.data;
    },
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (err) => {
      console.log('error message ', err);
    }
  });
  return { mutate, isLoading, isError, error, data };
};
