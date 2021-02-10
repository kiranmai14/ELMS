import React, { useState,useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import axios from 'axios';


function Calendarcomp(){
    const [holidays,setHolidays] = useState([]);
    const value =(new Date());

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

    return (
        <div>
        <Calendar
            value={value}
            tileDisabled={({date})=>{
                var d=(moment(date).format('YYYY-MM-DD'))
                if( date.getDay() === 0 || date.getDay() === 6)
                    return true;
                if(holidays.indexOf(d)!==-1)
                    return true;
                return false;
            }}
        />
        </div>
    )
    
}

export default Calendarcomp;
