import React from 'react';
import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

type Props<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>;
  name: FieldPath<TFieldValues>;
  errorMessage?: string;
  type: React.HTMLInputTypeAttribute;
  className: string;
  placeholder: string;
  autoComplete: string;
  classNameInput?: string;
  classNameError?: string;
};

const Input = <TFieldValues extends FieldValues = FieldValues>({
  register,
  name,
  errorMessage,
  type,
  className,
  placeholder,
  autoComplete,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'
}: Props<TFieldValues>) => {
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
