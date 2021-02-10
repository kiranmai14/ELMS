import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeRow from './EmployeeRow';

function EmployessBranch(props) {
  const [loading,setLoading] = useState(true);
  const [emps,setEmps] = useState([]);
  const branch_id= props.match.params.id;
  useEffect(()=>{
    axios.post('http://localhost:5000/branch/emps',{
      token:localStorage.getItem('token'),
      id:props.match.params.id
    }).then(res=>{
            setEmps(res.data.result);
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])


  if(loading)
  {
    return(<div>Loading</div>)
  }
  else
  return (
    <div>
      <div>
          {emps&&emps.map((emp)=><EmployeeRow key={emp.emp_id} emp={emp} id={branch_id}/>)}
      </div>
    </div>
  );

}
 
export default EmployessBranch;