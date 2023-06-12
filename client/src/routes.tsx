import { createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';

export const PATHS = {
  root: '/',
  employee: '/employee',
  status: '/status',
  login: '/login',
  register: '/register'
} as const;

export const appRouter = createBrowserRouter([
  {
    path: PATHS.root,
    element: <h1>Main Page</h1>
  },
  {
    path: PATHS.login,
    element: <Login />
  },
  {
    path: PATHS.register,
    element: <Register/>
  }
]);