import { Toaster } from 'react-hot-toast';
import { Footer, Header } from '@/widgets';
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
