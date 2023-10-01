import * as yup from 'yup';

export type FormValues = {
  email: string;
  password: string;
  confirm_password: string;
};

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const inputSchema = yup
  .object()
  .shape({
    email: yup.string().required('Required').email('Email invalid').min(5).max(32),
    password: yup
      .string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .max(32, 'Password is too long - should be 32 chars maximum.')
      .required('Please provide a valid password')
      .matches(passwordRules, 'At least 1 uppercase letter, 1 lowercase letter, 1 number'),
    confirm_password: yup
      .string()
      .min(8)
      .max(32)
      .required('Required')
      .oneOf([yup.ref('password')], 'Passwords must match')
  })
  .required();
