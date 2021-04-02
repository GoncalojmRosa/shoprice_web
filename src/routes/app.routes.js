import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import Contact from '../Pages/Contact'
import ItemsForm from '../Pages/ItemsForm'
import Landing from '../Pages/Landing'
import LandingTest from '../Pages/LandingTest'
import Notify from '../Pages/Notify'
import Profile from '../Pages/Profile'
import Test from '../Pages/Test/test'


function AppRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/compare" component={ItemsForm} />
      <Route path="/contact" component={Contact} />
      <Route path="/notify" component={Notify} />
      <Route path="/profile" component={Profile} />
      {/* <Redirect path="*" to="/" /> */}
      <Route path="/test" component={Test} />
      <Route path="/LandingTest" component={LandingTest} />
    </BrowserRouter>
  )
}

export default AppRoutes;