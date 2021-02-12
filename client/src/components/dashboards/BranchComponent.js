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
import OldRequestBranch from '../OldRequestsBranch';
import EmployeeUpdate from '../EmployeeUpdate';
import EmployeeCreate from '../EmployeeCreate';
import EmployeeRequests from '../EmployeeRequests';

function BranchComponent(props) {
    let { path, url } = useRouteMatch();
    return (
      <div>
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
                <Link to={`${url}/oldrequests`}>Old Request</Link>
                </li>
                <li>
                <Link to={`${url}/AddEmployee`}>Add Employee</Link>
                </li>
            </ul>
        </div>
        <div>
                <h1>Branch Page</h1>
        </div>
            <Switch>
              <Route exact path={path} component={DepartmentsBranch} />
              <Route path={`${path}/departments`} component={DepartmentsBranch} />
              <Route path={`${path}/empList`} component={EmployeesBranch} />
              <Route path={`${path}/requests`} component={RequestBranch} />
              <Route path={`${path}/oldrequests`} component={OldRequestBranch} />
              <Route exact path={`${path}/emp/:emp_id`} component={EmployeeUpdate} />
              <Route path={`${path}/AddEmployee`} component={EmployeeCreate} />
              <Route exact path={`${path}/emp/reqs/:emp_id`} component={EmployeeRequests} />
            </Switch>
      </div>
    );
  }
   
export default BranchComponent;