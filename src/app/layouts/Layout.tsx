import { Footer, Header } from '@/widgets';
import './Layout.scss';

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className='layout'>
      <Header />
      <main className='layout__content'>{children}</main>
      <Footer />
    </div>
  );
};
