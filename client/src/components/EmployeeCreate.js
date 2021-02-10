import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

const EmpSchema = yup.object().shape({
    empId: yup.string().required(),
    deptCode : yup.string().required(),
    firstName : yup.string().required(),
    lastName : yup.string(),
    email : yup.string().email().required(),
    password :yup.string().min(5).required(),
    gender : yup.mixed().oneOf(["MALE","FEMALE","OTHER"]),
    phone : yup.number().required(),
    casualLeaves : yup.number().positive().integer().required(),
    sickLeaves :  yup.number().positive().integer().required(),
    unpaidLeaves : yup.number().integer().required()
  });

function EmployeeCreate(props) {

    const { register, handleSubmit, errors } = useForm({resolver:yupResolver( EmpSchema )});

    const [loading,setLoading] = useState(false);
   // const [branches,setBranches] = useState([]);
    const [depts,setDepts] = useState([]);
    const [branchId,setBranchId] = useState('');
  

    useEffect(()=>{
        setLoading(true);
        axios.post('http://localhost:5000/branch/depts',{
            token:localStorage.getItem('token'),
            id:props.match.params.id
        }).then(res=>{
            setDepts(res.data.result);
            setBranchId(res.data.branchId);
            setLoading(false);
        }).catch(err=>{
            console.log(err);
            setLoading(false);
          })
          // eslint-disable-next-line
    },[])

    const onSubmit=(data)=>{
        var { empId , deptCode ,role ,firstName,lastName,email,password,gender,DOB,country,city,address,phone,casualLeaves,sickLeaves,unpaidLeaves} = data;
        axios.post('http://localhost:5000/branch/empCreate',{
            token:localStorage.getItem('token'),
            id:props.match.params.id,
            empId,
            deptCode,role,firstName,lastName,
            email,password,gender,DOB,country,city,
            address,phone,casualLeaves,sickLeaves,unpaidLeaves
        }).then(res=>{
            if(res.data.error)
            {}   //setError(true);
            else if(!!props.match.params.id===false)
                props.history.push(`/SubadminDashboard/emp/${empId}`);
            else if(!!props.match.params.id===true)
                props.history.push(`/AdminDashboard/branch/${props.match.params.id}/emp/${empId}`);
        }).catch(err=>{
            console.log(err);
        })
    }

    if(loading)
        return <div>Loading...</div>
    
    return (
        <div>
        <h4>Branch Id : {branchId}</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label >Choose a dept:</label>
                <select  name="deptCode" ref={register} >
                    <option hidden disabled selected value> -- select an option -- </option>
                    { depts.map((dept)=><option value={dept.code} id={dept.code}>{dept.name}</option>) }
                </select>
            </div>
            
            <div>
                <label>Employee ID</label>
                <input type="text" name="empId" placeholder="Can't be changed later" ref={register} />
                {errors.empId && <p>{errors.empId.message}</p>}
            </div>

            <div>
                <label>Role</label>
                <input type="text" name="role" ref={register} />
                {errors.role && <p>{errors.role.message}</p>}
            </div>

            <div>
                <label>First Name</label>
                <input type="text" name="firstName" ref={register} />
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>

            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" ref={register} />
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input type="text" name="email" ref={register} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Password</label>
                <input type="text" name="password" ref={register} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
                <label>Gender</label>
                <select  name="gender" ref={register}>
                    <option value="MALE" id="MALE">MALE</option>
                    <option value="FEMALE" id="FEMALE">FEMALE</option>
                    <option value="OTHER" id="OTHER">OTHER</option>
                </select>
                {errors.gender && <p>{errors.gender.message}</p>}
            </div>

            <div>
                <label>DOB</label>
                <input type="date" name="DOB" ref={register} />
                {errors.DOB && <p>{errors.DOB.message}</p>}
            </div>

            <div>
                <label>Country</label>
                <input type="text" name="country" ref={register} />
                {errors.country && <p>{errors.country.message}</p>}
            </div>

            <div>
                <label>City</label>
                <input type="text" name="city" ref={register} />
                {errors.city && <p>{errors.city.message}</p>}
            </div>

            <div>
                <label>Address</label>
                <input type="text" name="address" ref={register} />
                {errors.address && <p>{errors.address.message}</p>}
            </div>

            <div>
                <label>phone number</label>
                <input type="text" name="phone" ref={register} />
                {errors.phone && <p>{errors.phone.message}</p>}
            </div>

            <div>
                <label>casual leaves remaining</label>
                <input type="number" name="casualLeaves" ref={register} />
                {errors.casualLeaves && <p>{errors.casualLeaves.message}</p>}
            </div>

            <div>
                <label>sick leaves remaining</label>
                <input type="number" name="sickLeaves" ref={register} />
                {errors.sickLeaves && <p>{errors.sickLeaves.message}</p>}
            </div>

            <div>
                <label>unpaid leaves remaining</label>
                <input type="number" name="unpaidLeaves" ref={register} />
                {errors.unpaidLeaves && <p>{errors.unpaidLeaves.message}</p>}
            </div>
            
            <input type="submit" />
        </form>
        </div>
    );
}
 
export default EmployeeCreate;