import React, { useContext } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './Components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import AppRoutes from './routes/app.routes';
import AdminRoutes from './routes/admin.routes';
import AuthRoutes from './routes/auth.routes';
import DemoRoutes from './routes/demo.routes';
import { AuthContext } from './contexts/auth';

const App = () => {
  const app = useRoutes(AppRoutes);
  const demo = useRoutes(DemoRoutes);
  const auth = useRoutes(AuthRoutes);
  const admin = useRoutes(AdminRoutes);
  const context = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {context.signed ? (context.isAdmin ? admin : context.isDemo ? demo : app) : auth}
      {/* {useContext(AuthContext).isAdmin ? admin && console.log('ESTOU LOGADO') : app} */}
    </ThemeProvider>
  );
};

export default App;
