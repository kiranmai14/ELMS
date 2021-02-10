import React, {  useState } from 'react';
import axios from 'axios';
import {
    Link
  } from "react-router-dom";
function Branch(props) {
    const b=props.branch;
    const [del,setDel]= useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError]= useState('');
    const handleDelete=()=>{
        setLoading(true);
        axios.post('http://localhost:5000/admin/branchDel',{
            token:localStorage.getItem('token'),
            branchId:b.branch_id
        }).then(res=>{
            if(res.data.error)
                setError(res.data.message);
            else
                setDel(true);
            setLoading(false)
        }).catch(err=>{
              console.log(err);
              setLoading(false);
        })
    }


    if(del) return <div></div>
    return (
        <div>
            <ul>
                <li>ID : {b.branch_id}</li>
                <li>NAME : {b.name}</li>
                <li>LOCATION : {b.location}</li>
                <li>ADMIN : {b.admin_name}</li>
                <li>ADMIN EMAIL : {b.admin_email}</li>
                <Link to={`/AdminDashboard/update/${b.branch_id}`}>Update</Link>
                <Link to={`/AdminDashboard/branch/${b.branch_id}`}>Details</Link>
                <button onClick={handleDelete} disabled={loading}>delete</button>
                <div>
                    {error&&<p>{error}</p>}
                </div>
            </ul>
        </div>
    )
}

export default Branch;