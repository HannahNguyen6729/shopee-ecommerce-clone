import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { AuthResponse } from 'src/types/auth.type';
import { http } from 'src/utils/http';

type UserRegisterParams = {
  email: string;
  password: string;
};

type UserRegisterResponse = {
  isLoading: boolean;
  error: unknown;
  isError: boolean;
  mutate: UseMutateFunction<AuthResponse, Error, UserRegisterParams, unknown>;
  data?: AuthResponse;
};

export const useMutateUserRegister = (): UserRegisterResponse => {
  const { mutate, isLoading, isError, error, data } = useMutation<AuthResponse, Error, UserRegisterParams>({
    mutationFn: async (userInfo: UserRegisterParams) => {
      const res = await http.post('/register', userInfo);
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
