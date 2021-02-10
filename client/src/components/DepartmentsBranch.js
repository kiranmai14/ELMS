import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Department from './Department';

function DepartmentsBranch(props) {
  const [loading,setLoading] = useState(true);
  const [depts,setDepts] = useState([]);
  const [adding,setAdding] = useState(false);
  const [deptCode,setDeptCode] = useState('');
  const [deptName,setDeptName] = useState('');
  const [deptShortName,setDeptShortName]= useState('');
  const [error,setError]= useState('');

  useEffect(()=>{
    axios.post('http://localhost:5000/branch/depts',{
        token:localStorage.getItem('token'),
        id:props.match.params.id
    }).then(res=>{
            setDepts(res.data.result);
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  const handleAddDept = () => {
    setAdding(true);
    axios.post('http://localhost:5000/branch/addDept',{
        token:localStorage.getItem('token'),
        id:props.match.params.id,
        code:deptCode,
        name:deptName,
        shortName:deptShortName
    }).then(res=>{
        setAdding(false);
        if(res.data.error)
            setError(res.data.message);
        else{
          setDepts([...depts,...res.data.result]);
          setDeptCode('');
          setDeptName('');
          setDeptShortName('');
        }
    }).catch(err=>{
          console.log(err);
          setAdding(false);
    })
  }

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
        <form>
          <input type="text" placeholder="code" value={deptCode} onChange={e=>setDeptCode(e.target.value)} />
          <input type="text" placeholder="name" value={deptName} onChange={e=>setDeptName(e.target.value)} />
          <input type="text" placeholder="shortname" value={deptShortName} onChange={e=>setDeptShortName(e.target.value)} />
          <input type="button" value={adding ? 'Adding' : 'Add'} onClick={handleAddDept} disabled={adding} />
        </form>
      </div>
      {depts&&depts.map((dept)=><Department key={dept.code} dept={dept}/>)}
    </div>
  );
  
}
 
export default DepartmentsBranch;