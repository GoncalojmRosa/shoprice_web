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
import Settings from '../Pages/Settings';
import Suggestions from '../Pages/Suggestions';

const AppRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },    
      { path: 'settings', element: <Settings /> },
      { path: 'suggestions', element: <Suggestions /> },
      // { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  { path: 'compare', element: <ItemsForm /> },
  {
    path: '/',
    element: <LandingTest />,
  }
];

export default AppRoutes;
