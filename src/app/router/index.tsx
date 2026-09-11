import { createBrowserRouter } from 'react-router-dom';
import { ErrorFallback } from '@/shared/components';
import { CharacterPage, CharactersPage } from '@/pages';
import { App } from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorFallback message='Sorry, something went wrong' />,
    children: [
      {
        index: true,
        element: <CharactersPage />
      },
      {
        path: '/character/:id',
        element: <CharacterPage />
      }
    ]
  }
]);
