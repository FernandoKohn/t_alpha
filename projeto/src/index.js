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
import { Dashboard } from './components/Dashboard';
import { ProtectedDashboard } from './components/utils/ProtectedDashboard';

const router = createBrowserRouter([
  {
    path: "/t_alpha",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/t_alpha",
        element: <Home />,
        errorElement: <ErrorPage />,
        index: true
      },
      {
        path: "/Registrar",
        element: <Register />,
        errorElement: <ErrorPage />
      },
      {
        path: "/Login",
        element: <Login />,
        errorElement: <ErrorPage />
      },
      {
        element: <ProtectedDashboard />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/Dashboard",
            element: <Dashboard />,
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


