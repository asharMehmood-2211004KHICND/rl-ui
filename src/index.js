import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignupSignin from './Components/Pages/Login/SignupSignin'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Components/Pages/Error/ErrorPage';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


const router = createBrowserRouter([
  {
    path: "/Home",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <SignupSignin />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);