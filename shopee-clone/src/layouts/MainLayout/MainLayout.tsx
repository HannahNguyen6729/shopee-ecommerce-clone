import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
