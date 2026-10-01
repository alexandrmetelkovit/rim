import { Toaster } from 'react-hot-toast';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='layout'>
      <Header />
      <main className='layout__content'>{children}</main>
      <Footer />
      <Toaster position='bottom-right' />
    </div>
  );
};
