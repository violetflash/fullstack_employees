import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

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
  },
  {
    path: PATHS.employee,
    element: <h1>Employees</h1>
  }
]);