import React from 'react';
import {

  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import DepartmentsBranch from '../DepartmentsBranch';
import EmployeesBranch from '../EmployeesBranch';
import RequestBranch from '../RequestsBranch';
import EmployeeUpdate from '../EmployeeUpdate';
import EmployeeCreate from '../EmployeeCreate';
import EmployeeRequests from '../EmployeeRequests';

function SubadminDashboard(props) {
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
                <Link to={`${url}/departments`}>Departments</Link>
              </li>
              <li>
                <Link to={`${url}/empList`}>Employee List</Link>
              </li>
              <li>
                <Link to={`${url}/requests`}>Leave Request</Link>
              </li>
              <li>
                <Link to={`${url}/AddEmployee`}>Add Employee</Link>
              </li>
            </ul>
            <div>
                <h1>Welcome Subadmin </h1>
            </div>
            <Switch>
              <Route exact path={path} component={DepartmentsBranch} />
              <Route path={`${path}/departments`} component={DepartmentsBranch} />

              <Route path={`${path}/empList`} component={EmployeesBranch} />
 
              <Route path={`${path}/requests`} component={RequestBranch} />

              <Route exact path={`${path}/emp/:emp_id`} component={EmployeeUpdate} />
              <Route exact path={`${path}/emp/reqs/:emp_id`} component={EmployeeRequests} />
              <Route path={`${path}/AddEmployee`} component={EmployeeCreate} />
            </Switch>
        </div>  
    </div>
    
  );
}
 
export default SubadminDashboard;