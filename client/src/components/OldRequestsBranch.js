import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';
function OldRequestsBranch(props) {
  const [loading,setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0)
  const [reqs,setReqs] = useState([]);
  const id=props.match.params.id;

  useEffect(() => {
    axios.post('http://localhost:5000/branch/reqs',{
      token:localStorage.getItem('token'),
      id
    }).then(res=>{     
      var d=res.data.result;
      setReqs(res.data.result);
      const slice = d.slice(offset, offset + perPage)
      setData([...slice])
      setPageCount(Math.ceil(d.length / perPage))     
      setLoading(false);
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    })
   // eslint-disable-next-line
  }, [])

const getData = () => {
    const slice = reqs.slice(offset, offset + perPage)
    setData([...slice])
}



  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};

useEffect(() => {
  getData()
 // eslint-disable-next-line
}, [offset])

  if(loading)
  {
    return(<div>Loading</div>)
  }
  else
  return (
    <div>
      
      {data&&data.map((req)=><div>
        <div>
            ReqID:{req.leave_id}
        </div>
        <div>
            EmpID:{req.emp_id}
            Dept Code:{req.dept_code}
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
        <div>
            Status:{req.status}
            Admin Remarks:{req.admin_remarks}
        </div>
    </div>)}
      <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );

}
 
 
export default OldRequestsBranch;