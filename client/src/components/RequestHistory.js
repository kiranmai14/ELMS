
import React,{useState,useEffect} from 'react';
import EmployeeRequest from './EmployeeRequest';
import axios from 'axios';
 
function RequestHistory() {
  const [loading, setLoading] = useState(true);
  const [reqs,setReqs] = useState([]);
  const [error,setError] = useState(false);

  useEffect(()=>{
    axios.post('http://localhost:5000/emp/reqs',{
     token:localStorage.getItem('token')
    }).then(res=>{
       if(res.data.error)
         setError("Error Occured");
       else
         setReqs(res.data.result);
       setLoading(false);
    }).catch(err=>{
       setError("Error Occured");
       setLoading(false);
    })
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
  )
}

 
export default RequestHistory;