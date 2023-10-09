import CartHeader from 'src/components/CardHeader/CartHeader';
import Footer from 'src/components/Footer/Footer';
interface Props {
  children?: React.ReactNode;
}
const CartLayout = ({ children }: Props) => {
  return (
    <>
      <CartHeader />
      {children}
      <Footer />
    </>
  );
};

export default CartLayout;
