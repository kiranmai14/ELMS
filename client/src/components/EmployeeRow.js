import React from 'react';
import {Link} from "react-router-dom";

function EmployeeRow(props) {
    const emp = props.emp;
    return (
        <div>
            <div>
                DEPT CODE:{emp.dept_code}
                EMP ID:{emp.emp_id}
                ROLE:{emp.role}
                NAME:{emp.first_name} {emp.last_name}
                EMAIL:{emp.email}
                PHONE:{emp.phone_number}
            </div>
            {!!props.id===false&&
                <div>
                    <button><Link to={`/SubadminDashboard/emp/${emp.emp_id}`}>Update</Link></button>
                    <button><Link to={`/SubadminDashboard/emp/reqs/${emp.emp_id}`}>Requests</Link></button>
                </div>
            }
            {!!props.id===true&&
                <div>
                    <button><Link to={`/AdminDashboard/branch/${props.id}/emp/${emp.emp_id}`}>Update</Link></button>
                    <button><Link to={`/AdminDashboard/branch/${props.id}/emp/reqs/${emp.emp_id}`}>Requests</Link></button>
                </div>
            
            }
        </div>
    )
}

export default EmployeeRow;