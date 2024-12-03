// main.tsx
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchBooks from './pages/Search';
import SavedBooks from './pages/Mybooks';
import StartPage from './pages/StartPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
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
