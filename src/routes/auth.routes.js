import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Register from '../Pages/register/Register'
// import ForgotPassword from '../Pages/ForgotPassword'
// import ResetPassword from '../Pages/ResetPassword'
// import ValidateAccount from "../Pages/";
import UserProfile from '../Pages/Profile'
import Notify from '../Pages/Notify'
import Login from '../Pages/login/Login'

function AuthRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Register} />
      {/* <Route path="/forgot-password" exact component={ForgotPassword} /> */}
      {/* <Route path="/reset-password" exact component={ResetPassword} /> */}
      {/* <Route path="/validate-account" exact component={ValidateAccount} /> */}
      
      <Route path="/notify" component={Notify} />
    </BrowserRouter>
  )
}

export default AuthRoutes