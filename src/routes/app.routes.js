import { Navigate } from 'react-router-dom';
import DashboardLayout from '../Components/DashboardLayout';
import Account from '../Pages/Account';
import ItemsForm from '../Pages/ItemsForm';
import LandingTest from '../Pages/LandingTest';
import Settings from '../Pages/Settings';
import Suggestions from '../Pages/Suggestions';
import NewsLetter from '../Pages/NewsLetter';
import Login from '../Pages/Login';

const AppRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },    
      { path: 'settings', element: <Settings /> },
      { path: 'suggestions', element: <Suggestions /> },
      { path: 'news', element: <NewsLetter /> },
      { path: 'abc', element: <Login/> },
      // { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  { path: 'compare', element: <ItemsForm /> },
  {
    path: '/',
    element: <LandingTest />,
  },
  { path: '*', element: <Navigate to="/" /> },

];

export default AppRoutes;
