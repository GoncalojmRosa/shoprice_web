import React, { useContext } from 'react';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { AuthContext } from '../contexts/auth';
import AdminRoutes from './admin.routes';

const Routes = () => {
  const context = useContext(AuthContext);

  if (context.signed) {
    if (context.isAdmin) {
      return <AdminRoutes />;
    } else {
      return <AppRoutes />;
    }
  } else {
    return <AuthRoutes />;
  }
};

export default Routes;
