import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


import EmployeeProfile from '../EmployeeProfile';
import ApplyLeave from '../ApplyLeave';
import RequestHistory from '../RequestHistory';

function EmployeeDashboard(props) {
  let { path, url } = useRouteMatch();
 
  // handle click event of logout button
  const handleLogout = () => {   
    localStorage.setItem('token','');   
    props.history.push('/');
  }
 
  return (
    <div>
      <div>
        <input type="button" onClick={handleLogout} value="Logout" />
      </div>
      <div>
        <ul>
          <li>
            <Link to={`${url}/profile`}>Profile</Link>
          </li>
          <li>
            <Link to={`${url}/leave`}>Apply Leave</Link>
          </li>
          <li>
            <Link to={`${url}/requests`}>Leave History</Link>
          </li>
        </ul>
      </div>
      <div>
        <h1>Welcome Employee!</h1>
      </div>
      <Switch>
              <Route exact path={path}>
                <EmployeeProfile />
              </Route>
              <Route path={`${path}/profile`}>
                <EmployeeProfile />
              </Route>
              <Route path={`${path}/leave`}>
                <ApplyLeave />
              </Route>
              <Route path={`${path}/requests`}>
                <RequestHistory />
              </Route>
      </Switch>
    </div>
  );
}
 
export default EmployeeDashboard;