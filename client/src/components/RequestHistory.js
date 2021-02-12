
import React,{useState,useEffect} from 'react';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
 
function RequestHistory() {
  const [loading, setLoading] = useState(true);
  const [reqs,setReqs] = useState([]);
  const [error,setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(3);
  const [pageCount, setPageCount] = useState(0)

  useEffect(()=>{
    axios.post('http://localhost:5000/emp/reqs',{
     token:localStorage.getItem('token')
    }).then(res=>{
       if(res.data.error)
         setError("Error Occured");
       else{
        var d=res.data.result;
        setReqs(res.data.result);
        const slice = d.slice(offset, offset + perPage)
        setData([...slice])
        setPageCount(Math.ceil(d.length / perPage))   
       }
       setLoading(false);
    }).catch(err=>{
       setError("Error Occured");
       setLoading(false);
    })
    // eslint-disable-next-line
  },[])

  const getData = () => {
    const slice = reqs.slice(offset, offset + perPage)
    setData([...slice])
}

useEffect(() => {
  getData()
 // eslint-disable-next-line
}, [offset])

const handlePageClick = (e) => {
  const selectedPage = e.selected;
  setOffset(selectedPage + 1)
};

  if(loading)
  {
    return(<div>Loading</div>)
  }
  else
  return (
    <div>
      <div>
        {error&&<p>{error}</p>}
      </div>
      <div>
      
      {data&&data.map((req)=><div>
        <div>
            ReqID:{req.leave_id}
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
    </div>
  )
}

 
export default RequestHistory;