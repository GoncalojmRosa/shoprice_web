import { Navigate } from 'react-router-dom';
import DashboardLayout from '../Components/DashboardLayout';
import Account from '../Pages/Account';
import ItemsForm from '../Pages/ItemsForm';
import LandingTest from '../Pages/LandingTest';
import Suggestions from '../Pages/Suggestions';
import NewsLetter from '../Pages/NewsLetter';

const AppRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },    
      { path: 'suggestions', element: <Suggestions /> },
      { path: 'news', element: <NewsLetter /> },
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
