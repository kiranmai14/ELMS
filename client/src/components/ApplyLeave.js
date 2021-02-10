import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange} from 'react-date-range';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import moment from 'moment';


function ApplyLeave(props) {
  const LeaveSchema = yup.object().shape({
    desc: yup.string(),
    type:yup.mixed().oneOf(["sick","casual"],'Invalid').required()
  });
  const { register, handleSubmit, errors } = useForm({ resolver:yupResolver( LeaveSchema ) });
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  // eslint-disable-next-line
  const [holidays,setHolidays] = useState([]);
  const [submitted,setSubmitted] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    axios.post('http://localhost:5000/admin/holidaysGet',{
        token:localStorage.getItem('token')
    }).then(res=>{
            var data=res.data.result;
            var dates=data.map(ele=>moment(ele.date).format('YYYY-MM-DD'))
            setHolidays(dates);
            
        }).catch(err=>{
          console.log(err);
        })
        // eslint-disable-next-line
  },[])

  const diff=(startDate,endDate)=>{
    endDate=moment(endDate,'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
    var cur = startDate;
    var days=0;
    while(cur!==endDate)
    {
      var day=moment(cur).day();
      if(day===0||day===6||holidays.indexOf(cur)!==-1)
      {

      }
      else
      {
          days++;
      }
      cur=moment(cur,'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
    }
    return days;
  }

  const onSubmit = data => {
    var from = moment(state[0].startDate).format('YYYY-MM-DD');
    var to = moment(state[0].endDate).format('YYYY-MM-DD');
    var days=diff(from,to);
    setLoading(true);
    axios.post('http://localhost:5000/emp/req',{
            token:localStorage.getItem('token'),
            type:data.type,
            desc:data.desc,
            from,
            to,days
        }).then(res=>{
            if(res.data.error){
  
            }   
            else{
               setSubmitted('yes');
            }
            setLoading(false);
        }).catch(err=>{
            console.log(err);
        })
  };



  if(loading)
  return <div>Processing</div>


  if(submitted)
  return <div>SUBMITTED YOUR REQUEST SUCCESSFULLY  :~)

  </div>


  return (
    <div>
      Welcome to the ApplyLeave Page!
      <div>
          <form onSubmit={handleSubmit(onSubmit)}>

              <div>
                <label>Type</label>
                <select  name="type" ref={register}>
                  <option value="sick" id="sick">Sick Leave</option>
                  <option value="casual" id="casual">Casual Leave</option>
                </select>
                {errors.type && <p>{errors.type.message}</p>}
              </div>

              <div style={{ marginBottom: 10 }}>
                <label>Description</label>
                <input type="text" name="desc" ref={register} />
                {errors.desc && <p>{errors.desc.message}</p>}
              </div>

              <input type="submit" />

          </form>
          <DateRange
            editableDateInputs={true}
            onChange={item => {
              setState([item.selection])
            }}
            moveRangeOnFirstSelection={false}
            ranges={state}
            
          />
          <div>
            <Calendar />
          </div>
      </div>
    </div>
  )
  
}

 
export default ApplyLeave;