import React from 'react';

interface Props {
  children?: React.ReactNode;
}
const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      RegisterLayout
      {children}
    </div>
  );
};

export default RegisterLayout;
