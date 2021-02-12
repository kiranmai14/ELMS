import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Request from './Request';

function RequestsBranch(props) {
  const [loading,setLoading] = useState(true);
  const [reqs,setReqs] = useState([]);
  const id=props.match.params.id;
  useEffect(()=>{
    axios.post('http://localhost:5000/branch/reqs/pending',{
      token:localStorage.getItem('token'),
      id
    }).then(res=>{     
        setReqs(res.data.result);
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
      {reqs&&reqs.map((req)=><Request role="admin" id={req.leave_id} req={req} branchId={id}/>)}
    </div>
  );

}
 
 
export default RequestsBranch;