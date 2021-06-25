import { Navigate } from 'react-router-dom';
import Login from '../Pages/Login';
import SignUp from '../Pages/Register';
import ForgotPassword from '../Pages/ForgotPassword/index';
import SendCode from '../Pages/ForgotPassword/sendCode';


const AuthRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sendCode',
    element: <SendCode />,
  },
  {
    path: '/forgotPassword',
    element: <ForgotPassword />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  // {
  //   path: '*', 
  //   element: <Navigate to="/login" />,
  // }
];

export default AuthRoutes;
