// main.tsx
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchBooks from './pages/Search';
import SavedBooks from './pages/Mybooks';
import StartPage from './pages/StartPage';
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:  <ErrorPage />,
    children: [
      {
        index: true,
        element: <StartPage />
      },
      {
        path: '/saved',
        element: <SavedBooks />
      },
      {
        path: '/searchbooks',
        element: <SearchBooks />
      }
      //  {
      //   path: '/reviews/:bookId', // Nueva ruta con parámetro
      //   element: <ReviewsPage />
      // }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
