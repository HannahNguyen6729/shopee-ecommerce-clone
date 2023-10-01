import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from 'src/utils/inputSchema';

type InputName = 'email' | 'password' | 'confirm_password';

type Props = {
  register: UseFormRegister<FormValues>;
  name: InputName;
  errorMessage?: string;
  type: React.HTMLInputTypeAttribute;
  className: string;
  placeholder: string;
  autoComplete: string;
  classNameInput?: string;
  classNameError?: string;
};

const Input = ({
  register,
  name,
  errorMessage,
  type,
  className,
  placeholder,
  autoComplete,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'
}: Props) => {
  return (
    <div className={className}>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={classNameInput}
      />
      <div className={classNameError}>{errorMessage} </div>
    </div>
  );
};

export default Input;
