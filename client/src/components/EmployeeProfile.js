import React,{useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';

function EmployeeProfile() {
    const [emp,setEmp] = useState({});
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    useEffect(()=>{
       axios.post('http://localhost:5000/emp/profile',{
        token:localStorage.getItem('token')
       }).then(res=>{
          if(res.data.error)
            setError(res.data.message);
          else
            setEmp(res.data.result[0]);
          setLoading(false);
       }).catch(err=>{
          console.log(err);
          setLoading(false);
       })
    },[])


    if(loading)
    return <div>Loading..</div>

    return (
      <div>

        { error &&
          <h4>Error occured </h4>
        }
        {
          !!error&&
          <div>Welcome to the EmployeeProfile Page!</div>
        }
        <div>
            BRANCH CODE:{emp.branch_id}
            DEPT CODE:{emp.dept_code}
            EMP ID:{emp.emp_id}
            ROLE:{emp.role}
            NAME:{emp.first_name} {emp.last_name}
            EMAIL:{emp.email}
            GENDER:{emp.gender}
            PHONE:{emp.phone_number}
            DOB: {moment(emp.dob).format('YYYY-MM-DD')}
            COUNTRY :{emp.country}
            CITY :{emp.city}
            ADDRESS :{emp.address}
            CASUAL LEAVES REMAINING :{emp.casual_leaves}
            SICK LEAVES REMAINING :{emp.sick_leaves}
            UNPAID LEAVES TAKEN :{emp.unpaid_leaves}     
        </div>
      </div>
      
  );
}

 
export default EmployeeProfile;