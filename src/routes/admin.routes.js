import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import TestRandom from '../Pages/Reports'
import Test from '../Pages/Test/test';
import AppRoutes from './app.routes';



function AdminRoutes() {
  return (
    <BrowserRouter>
      <AppRoutes />
        <Route path="/reports" component={TestRandom} />
    </BrowserRouter>
  )
}

export default AdminRoutes;