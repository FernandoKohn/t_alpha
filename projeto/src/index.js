import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Root } from './components/Root';
import { ErrorPage } from "./components/ErrorPage"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login'
import { ProtectedLogin } from './components/utils/ProtectedLogin';
import { Register } from './components/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        index: true
      },
      {
        element: <ProtectedLogin/>,
        children: [
          {
            path: "/Registrar",
            element: <Register/>,
            errorElement: <ErrorPage />
          },
          {
            path: "/Login",
            element: <Login/>,
            errorElement: <ErrorPage />
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


