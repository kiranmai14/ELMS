import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

const LoginSchema = yup.object().shape({
  role:  yup.mixed().oneOf(["admin","subadmin","employee"],"Choose a role"),
  email : yup.string().email().required(),
  password :yup.string().required()
});

function Login(props) 
{
  const { register, handleSubmit, errors } = useForm({resolver:yupResolver( LoginSchema )});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit=(data)=>{
    setLoading(true);
    var { role,email,password } = data;
    axios.post('http://localhost:5000/login',{
            role,
            email,
            password
        }).then(res=>{
            if(res.data.error)
            {
                setError(res.data.message);
                setLoading(false);
            }
            else
            {
                localStorage.setItem('token',res.data.token);
                if(role === 'admin')
                  props.history.push('/AdminDashboard');
                else if(role === 'subadmin')
                  props.history.push('/SubadminDashboard');
                else if( role === 'employee')
                  props.history.push('/EmployeeDashboard');

            }
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        })
  }

  return (
    <div >
        <div>Login</div>
        <br />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label >Role</label>
            <select  name="role" ref={register} >
              <option hidden disabled selected value> -- select an option -- </option>
              <option value="admin">admin</option>
              <option value="subadmin">subadmin</option>
              <option value="employee">employee</option>
            </select>
            {errors.role && <p>{errors.role.message}</p>}
          </div>

          <div >
                <label>Email</label>
                <input type="text" name="email" ref={register} />
                {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div >
                <label>Password</label>
                <input type="text" name="password" ref={register} />
                {errors.password && <p>{errors.password.message}</p>}
          </div>

          <input type="submit" value={loading ? 'Loading...' : 'Login'} disabled={loading}/>
        </form>
  
        <div>
          {error&&<p>{error}</p>}
        </div>
    </div>
  );
}

 
export default Login;