import React, {  useState } from 'react';
import axios from 'axios';


function Department(props) {
    const [dept,setDept] = useState(props.dept);
    const [del,setDel]= useState(false);
    const [update,setUpdate] = useState(false);
    const [deptName,setDeptName] = useState(dept.name);
    const [deptShortName,setDeptShortName]= useState(dept.short_name);
    const [loading,setLoading] = useState(false);
    const [error,setError]= useState('');

    const handleUpdateDept = (props) => {
        setLoading(true);
        axios.post('http://localhost:5000/branch/dept',{
            token:localStorage.getItem('token'),
            code:dept.code,
            name:deptName,
            shortName:deptShortName
        }).then(res=>{
            if(res.data.error)
                setError(res.data.message);
            else
                setDept(res.data.result[0]);
            setLoading(false);setUpdate(false);
        }).catch(err=>{
              console.log(err);
              setLoading(false);setUpdate(false);
        })
    }

    const handleDeleteDept = () => {
        setLoading(true);
        axios.post('http://localhost:5000/branch/deldept',{
            token:localStorage.getItem('token'),
            code:dept.code
        }).then(res=>{
            if(res.data.error)
                setError(res.data.message);
            else
                setDel(true);
            setLoading(false);
        }).catch(err=>{
              console.log(err);
              setLoading(false);
        })
    }
    if(del) return <div></div>
    if(loading)
      return <div>Loading</div>
    else
    if(update)
        return (
            <div>
            <div>
                {error&&<p>{error}</p>}
            </div>
            <form>
                <p>{dept.code}</p>
                <input type="text" value={deptName} onChange={e=>setDeptName(e.target.value)} />
                <input type="text" value={deptShortName} onChange={e=>setDeptShortName(e.target.value)} />
                <input type="button" value="Update" onClick={handleUpdateDept} />
            </form>
            </div>
        )
    else
        return (
            <div>
                <div>
                    {error&&<p>{error}</p>}
                </div>
                <h3>{dept.code}  {dept.name}  {dept.short_name} 
                    <button onClick={()=>setUpdate(true)}>update</button>
                    <button onClick={handleDeleteDept}>delete</button>
                </h3>
            </div>
        )
}

export default Department;