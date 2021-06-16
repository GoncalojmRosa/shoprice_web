import { Navigate } from 'react-router-dom';
import DashboardLayout from '../Components/DashboardLayout';
import MainLayout from '../Components/MainLayout';
import Account from '../Pages/Account';
import CustomerList from '../Pages/CustomerList';
import Dashboard from '../Pages/Dashboard';
import ItemsForm from '../Pages/ItemsForm';
import LandingTest from '../Pages/LandingTest';
import Login from '../Pages/login/Login';
import LoginTest from '../Pages/login/Login';
import NotFound from '../Pages/NotFound';
import ProductList from '../Pages/ProductList';
import Register from '../Pages/Register';
import SignUp from '../Pages/register/Register';
import Settings from '../Pages/Settings';

const AuthRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '*', 
    element: <Navigate to="/login" />,
  }
];

export default AuthRoutes;
