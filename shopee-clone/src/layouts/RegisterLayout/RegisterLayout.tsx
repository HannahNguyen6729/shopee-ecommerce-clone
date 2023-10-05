import Footer from 'src/components/Footer/Footer';
import RegisterHeader from 'src/components/RegisterHeader/RegisterHeader';

interface Props {
  children?: React.ReactNode;
}
const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  );
};

export default RegisterLayout;
