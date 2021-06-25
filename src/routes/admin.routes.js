import { Navigate } from 'react-router-dom';
import DashboardLayout from '../Components/DashboardLayout';

import Account from '../Pages/Account';
import CustomerList from '../Pages/CustomerList';
import Dashboard from '../Pages/Dashboard';
import ItemsForm from '../Pages/ItemsForm';
import LandingTest from '../Pages/LandingTest';

import TestRandom from '../Pages/Reports';
import Settings from '../Pages/Settings';
import Suggestions from '../Pages/Suggestions';
import NewsLetter from '../Pages/NewsLetter';

import Login from '../Pages/Login';


const AdminRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'Test', element: <LandingTest /> },
      // { path: '*', element: <Navigate to="/404" /> },
      // { path: 'reports', element: <TestRandom/> },
      { path: 'news', element: <NewsLetter /> },
      { path: 'suggestions', element: <Suggestions /> },
    ]
  },{ path: 'compare', element: <ItemsForm /> },
  { path: 'abc', element: <Login/> },
  { path: 'reports', element: <TestRandom/> },
  {
    path: '/',
    element: <LandingTest />,
  }
];

export default AdminRoutes;
