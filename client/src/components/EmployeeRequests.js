import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeRequest from './EmployeeRequest';


//subadmin component

function EmployeeRequests(props) {
  var empId=props.match.params.emp_id;
  const [loading,setLoading] = useState(true);
  const [reqs,setReqs] = useState([]);
  const [error,setError]= useState('');

  useEffect(()=>{
    axios.post('http://localhost:5000/branch/empReqs',{
        token:localStorage.getItem('token'),
        empId
    }).then(res=>{
            setReqs(res.data.result);
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setError('Error Occured');
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
        {error&&<p>{error}</p>}
      </div>
      <div>
          {reqs&&reqs.map((req)=><EmployeeRequest key={req.leave_id}  req={req}/>)}
      </div>
    </div>
  );
  
}
 
export default EmployeeRequests;