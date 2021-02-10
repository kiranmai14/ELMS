import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import {  NavLink } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/dashboards/AdminDashboard';
import SubadminDashboard from './components/dashboards/SubadminDashboard';
import EmployeeDashboard from './components/dashboards/EmployeeDashboard';
import {PrivateRoute} from './components/PrivateRoute';
 
function App() {
    return (
    <div >
      <BrowserRouter>
        <div>
          <div >

          </div>
          <div >
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute path="/AdminDashboard" component={AdminDashboard} />
              <PrivateRoute path="/SubadminDashboard" component={SubadminDashboard} />
              <PrivateRoute path="/EmployeeDashboard" component={EmployeeDashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;