import React,{useState} from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";
import axios from 'axios';
function Request (props)
{
    const [req,setReq] = useState(props.req);
    const [status,setStatus] = useState('');
    const [remarks,setRemarks] = useState('');
    const [loading, setLoading] = useState(false);

    const branchId=props.branchId;

    const handleUpdate = () => {
        setLoading(true);
        var from=moment(req.from_date).format('YYYY-MM-DD')
        var to = moment(req.to_date).format('YYYY-MM-DD')
        from = moment(from,'YYYY-MM-DD');
        to = moment(to,'YYYY-MM-DD');
        var days=to.diff(from,'days')+1;
        axios.post('http://localhost:5000/branch/reqUpdate',{
            token:localStorage.getItem('token'),
            reqId:req.leave_id,
            days,
            status,
            remarks
        }).then(res=>{
            if(res.data.error)
            {
                console.log(res.data.error);
            }
            else
            {
                setReq(res.data.result[0]);
            }
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
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
                ReqID:{req.leave_id}
            </div>
            <div>
                EmpID:{req.emp_id}
                Dept Code:{req.dept_code}
            </div>
            <div>
                Name:{req.first_name} {req.last_name}
            </div>
            <div>
                From:{moment(req.from_date).format('MMMM Do YYYY')}
                To:{moment(req.to_date).format('MMMM Do YYYY')}
            </div>
            <div>
                Type:{req.type}
                Desc:{req.description}
            </div>
            <div>
                DAYS:{req.days}
            </div>
            
            {(req.status==="pending")&&<div>
                Status
                <select id="status" onChange={e=>setStatus(e.target.value)} >
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option value="accepted">Accept</option>
                    <option value="rejected">Reject</option>
                </select>
                Admin Remarks
                <input type="text" id={req.leave_id} placeholder="Remarks" onChange={e=>setRemarks(e.target.value)} />
                <div>
                    <button onClick={handleUpdate}>Update Status</button>
                </div>
            </div>}

            {(req.status!=="pending")&&
                <div>
                    Status:{req.status}
                    Admin Remarks:{req.admin_remarks}
                </div>
            }
            {!!branchId===false&&
                <div>
                    <button><Link to={`/SubadminDashboard/emp/reqs/${req.emp_id}`}>Requests</Link></button>
                </div>
            }
            {!!branchId===true&&
                <div>
                    <button><Link to={`/AdminDashboard/branch/${branchId}/emp/reqs/${req.emp_id}`}>Requests</Link></button>
                </div>
            
            }
            
        </div>
    )
}

export default Request;