import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutateUserLogin } from 'src/hooks/useMutateUserLogin';
import { LoginFormValues, loginInputSchema } from 'src/utils/inputSchema';
import { isAxiosUnprocessableEntityError } from 'src/utils/axiosError';
import { ResponseApi } from 'src/types/util.type';
import { useEffect } from 'react';

import Input from 'src/components/Input/Input';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginInputSchema)
  });

  const { mutate: mutateUser, error: mutateUserLoginError } = useMutateUserLogin();

  const onSubmitHandler: SubmitHandler<LoginFormValues> = (data) => {
    mutateUser({ email: data.email, password: data.password });
    reset();
  };

  useEffect(() => {
    if (isAxiosUnprocessableEntityError<ResponseApi<LoginFormValues>>(mutateUserLoginError)) {
      const formError = mutateUserLoginError.response?.data.data;

      if (formError) {
        Object.keys(formError).forEach((property) => {
          setError(property as keyof LoginFormValues, {
            type: 'Server error',
            message: formError[property as keyof LoginFormValues]
          });
        });
      }
    }
  }, [mutateUserLoginError, setError]);

  return (
    <div className='bg-orange'>
      <title>Login | Shopee Clone</title>
      <meta name='description' content='Login to Shopee website' />

      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Login </div>
              <Input
                register={register}
                name='email'
                type='email'
                className='mt-8'
                placeholder='Enter Email Address'
                autoComplete='on'
                errorMessage={errors.email?.message}
              />
              <Input
                register={register}
                name='password'
                type='password'
                className='mt-2'
                placeholder='Enter Password'
                autoComplete='on'
                errorMessage={errors.password?.message}
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                >
                  Login
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Register an account?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
