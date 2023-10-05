import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues, inputSchema } from 'src/utils/inputSchema';
import { useMutateUserRegister } from 'src/hooks/useMutateUserRegister';
import { isAxiosUnprocessableEntityError } from 'src/utils/axiosError';
import { ErrorResponseApi } from 'src/types/util.type';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/context/authContext';

import Input from 'src/components/Input/Input';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<FormValues>({
    resolver: yupResolver(inputSchema)
  });

  const { mutate: mutateUser, error: mutateUserRegisterError, data } = useMutateUserRegister();

  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    mutateUser({ email: data.email, password: data.password });
    reset();
  };

  useEffect(() => {
    if (
      isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormValues, 'confirm_password'>>>(mutateUserRegisterError)
    ) {
      const formError = mutateUserRegisterError.response?.data.data;

      if (formError) {
        Object.keys(formError).forEach((property) => {
          setError(property as keyof Omit<FormValues, 'confirm_password'>, {
            type: 'Server error',
            message: formError[property as keyof Omit<FormValues, 'confirm_password'>]
          });
        });
      }
    }

    if (data?.data.user) {
      setIsAuthenticated(true);
      navigate('/');
    }
  }, [data?.data.user, mutateUserRegisterError, navigate, setError, setIsAuthenticated]);

  return (
    <div className='bg-orange'>
      <title>Register | Shopee Clone</title>
      <meta name='description' content='Register to Shopee website' />

      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Register </div>
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

              <Input
                register={register}
                name='confirm_password'
                type='password'
                className='mt-2'
                placeholder='Confirm Password'
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                >
                  Register
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Already had an account?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
