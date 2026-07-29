import { createBrowserRouter } from 'react-router-dom';
import { CharacterPage, CharactersPage } from '@/pages';
import { App } from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <CharactersPage /> },
      { path: '/character/:id', element: <CharacterPage /> }
    ]
  }
]);
