import React,{useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

const EmpSchema = yup.object().shape({
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

function EmployeeUpdate(props) {

    const { register, handleSubmit,reset, errors } = useForm({resolver:yupResolver( EmpSchema )});
    var emp_id = props.match.params.emp_id;
    const [depts,setDepts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [branchId,setBranchId] = useState('');
    const [error,setError] = useState(false);
    const [deleted,setDeleted] = useState(false);

    useEffect(()=>{
        axios.post('http://localhost:5000/branch/emp',{
          token:localStorage.getItem('token'),
          empId:emp_id
        }).then(res=>{
            var data=res.data.result[0];
            if(data){
                var date= data.dob;
                date=moment(date).format('YYYY-MM-DD');
                reset({
                    deptCode : data.dept_code,
                    role : data.role,
                    firstName : data.first_name,
                    lastName : data.last_name,
                    email : data.email,
                    password : data.password,
                    gender : data.gender,
                    DOB : date,
                    country : data.country,
                    city : data.city,
                    address : data.address,
                    phone : data.phone_number,
                    casualLeaves : data.casual_leaves,
                    sickLeaves : data.sick_leaves,
                    unpaidLeaves : data.unpaid_leaves
                })
                setBranchId(data.branch_id)
            }
            setLoading(false);
            }).catch(err=>{
              console.log(err);
              setLoading(false);
            })
            // eslint-disable-next-line
      },[])

      useEffect(()=>{
        axios.post('http://localhost:5000/branch/depts',{
            token:localStorage.getItem('token'),
            id:props.match.params.id
        }).then(res=>{
                setDepts(res.data.result);
        }).catch(err=>{
              console.log(err);
            })
            // eslint-disable-next-line
      },[])

    const onSubmit=data=>{
        setLoading(true);
        var { deptCode ,role ,firstName,lastName,email,password,gender,DOB,country,city,address,phone,casualLeaves,sickLeaves,unpaidLeaves} = data;
        axios.post('http://localhost:5000/branch/empUpdate',{
            token:localStorage.getItem('token'),
            id:props.match.params.id,
            empId:emp_id,
            deptCode,role,firstName,lastName,
            email,password,gender,DOB,country,city,
            address,phone,casualLeaves,sickLeaves,unpaidLeaves
        }).then(res=>{
            var data=res.data.result[0];
            if(data)
            {
                var date= data.dob;
                date=moment(date).format('YYYY-MM-DD');
                reset({
                    deptCode : data.dept_code,
                    role : data.role,
                    firstName : data.first_name,
                    lastName : data.last_name,
                    email : data.email,
                    password : data.password,
                    gender : data.gender,
                    DOB : date,
                    country : data.country,
                    city : data.city,
                    address : data.address,
                    phone : data.phone_number,
                    casualLeaves : data.casual_leaves,
                    sickLeaves : data.sick_leaves,
                    unpaidLeaves : data.unpaid_leaves
                })
                setBranchId(data.branch_id)
            }
            if(res.data.error)
                setError(true);
            setLoading(false);
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }

    const handleDelete=()=>{
        axios.post('http://localhost:5000/branch/empDelete',{
            token:localStorage.getItem('token'),
            empId:emp_id
        }).then(res=>{
            if(res.data.error)
                setError(true);
            else
                setDeleted(true);
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }

    if(deleted)
        return <div>
            <h1>Employee is Deleted  :~(</h1>
        </div>
    if(loading)
        return <div>Loading</div>
    return (
        <div>
            <div>
                <h3>{error && <p>error occured</p>}</h3>
            </div>
                <h4>Branch Id : {branchId}</h4>
                <h4>Employee Id : {emp_id}</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label >Choose a dept:</label>
                    <select  name="deptCode" ref={register} >
                        <option hidden disabled selected value> -- select an option -- </option>
                        { depts.map((dept)=><option value={dept.code} id={dept.code}>{dept.name}</option>) }
                    </select>
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
                
                <div>
                    <button onClick={handleDelete}>DELETE</button>
                </div>
            
        </div>
    );
}
 
export default EmployeeUpdate;