import { Outlet } from 'react-router-dom';
import { Layout } from './layouts';

export const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
