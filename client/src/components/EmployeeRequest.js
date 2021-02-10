import React from 'react';
import moment from 'moment';


function EmployeeRequest (props)
{
    const req = props.req;

    return (
        <div>
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
        </div>
    )
}

export default EmployeeRequest;