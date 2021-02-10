import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import Branches from '../Branches';
import AddBranch from '../AddBranch';
import UpdateBranch from '../UpdateBranch';
import BranchComponent from './BranchComponent';
import UpdateHolidays from '../UpdateHolidays';

import '../sidebar.css'

function AdminDashboard(props) {
  let { path, url } = useRouteMatch();
 
  // handle click event of logout button
  const handleLogout = () => {   
    localStorage.setItem('token','');   
    props.history.push('/');
  }
 
  return (
    <div>
    <div><h3 id="header">SHRI CHANDRA BULK CARGO SERVICES PVT.LTD</h3></div>
    <div className="wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li >
            <Link to={`${url}/branches`}>Branches</Link>
          </li>
          <li>
            <Link to={`${url}/add`}>Add Branch</Link>
          </li>
          <li>
            <Link to={`${url}/holidays`}>Add Holidays</Link>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
      
    <div>
      <h1>Welcome Admin!</h1>
    </div>
      <Switch>
              <Route exact path={path}>
                <Branches />
              </Route>
              <Route path={`${path}/branches`}>
                <Branches />
              </Route>
              <Route path={`${path}/add`}>
                <AddBranch />
              </Route>
              <Route path={`${path}/update/:id`} component={UpdateBranch} />
              <Route path={`${path}/branch/:id`} component={BranchComponent} />
              <Route path={`${path}/holidays`} component={UpdateHolidays} />
      </Switch>
    </div>
    
    
  );
}
 
export default AdminDashboard;