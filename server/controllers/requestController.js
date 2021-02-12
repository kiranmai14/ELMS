var db = require('../db');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
      api_key: process.env.api_key_nodemailer,
      domain: process.env.domain_nodemailer
    }
  }

  const nodemailerMailgun = nodemailer.createTransport(mg(auth));


exports.req_list_emp=(req,res)=>{
    var role = req.user.role;
    var empId;
    if(role === 'employee')
        empId=req.user.id;
    else
        empId=req.body.empId;
    const q="SELECT * FROM leave_request WHERE emp_id=? ORDER BY from_date DESC";
    db.query(q,[empId]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err.sqlMessage);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}

exports.request_list=(req,res)=>{
    var role = req.user.role;
    var branchId;
    if(role === "subadmin")
         branchId=req.user.id;
    else if(role === "admin")
        branchId=req.body.id;
    const q="SELECT * FROM leave_request JOIN employee ON employee.emp_id = leave_request.emp_id JOIN department ON employee.dept_code=department.code WHERE employee.branch_id=? ORDER BY leave_request.from_date DESC";
    db.query(q,[branchId]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err.sqlMessage);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}

exports.request_list_pending=(req,res)=>{
    var role = req.user.role;
    var branchId;
    if(role === "subadmin")
         branchId=req.user.id;
    else if(role === "admin")
        branchId=req.body.id;
    var status = "pending";
    const q="SELECT * FROM leave_request JOIN employee ON employee.emp_id = leave_request.emp_id JOIN department ON employee.dept_code=department.code WHERE employee.branch_id=? AND leave_request.status=? ORDER BY leave_request.from_date DESC";
    db.query(q,[branchId,status]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err.sqlMessage);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}

exports.req_id=(req,res)=>{
    var reqId=req.body.reqId;
    const q="SELECT * FROM leave_request JOIN employee ON employee.emp_id = leave_request.emp_id JOIN department ON employee.dept_code=department.code WHERE leave_request.leave_id=?";
    db.query(q,[reqId]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}



exports.put_request=(req,res)=>{
    var status = req.body.status;
    var remarks = req.body.remarks;
    var reqId = req.body.reqId;
    const q="UPDATE leave_request SET status=?,admin_remarks=? WHERE leave_id=?";
    db.query(q,[status,remarks,reqId]).then(result=>{
        if(status!=="accepted")
            this.req_id(req,res);
        else {
            this.update(req,res);
        }    
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    });
}

exports.update=(req,res)=>{
    var reqId=req.body.reqId;
    const q="SELECT * FROM leave_request JOIN employee ON employee.emp_id = leave_request.emp_id JOIN department ON employee.dept_code=department.code WHERE leave_request.leave_id=?";
    db.query(q,[reqId]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        result=result[0];
        var type=result.type;
        var days=result.days;
        var emp_id = result.emp_id;
        var SL = result.sick_leaves;
        var CL = result.casual_leaves;
        var PL = result.unpaid_leaves;
        if(type === "sick")
        {
            while(days!==0&&SL!==0)
            {
                days-=1;
                SL-=1;
            }
        }
        else 
        {
            while(days!==0&&CL!==0)
            {
                days-=1;
                CL-=1;
            }
        }
        while(days!==0)
        {
            PL++;
            days--;
        }
        req.update={
            emp_id,
            SL,
            CL,
            PL
        }
        this.updateEmp(req,res);
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}

exports.updateEmp=(req,res)=>{
    var empId =req.update.emp_id;
    var casualLeaves = req.update.CL;
    var sickLeaves =req.update.SL;
    var unpaidLeaves = req.update.PL;
    var q = 'UPDATE employee SET casual_leaves=?,sick_leaves=?,unpaid_leaves=? WHERE emp_id=?';
    db.query(q,[casualLeaves,sickLeaves,unpaidLeaves,empId])
    .then(result=>{
        this.req_id(req,res);
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}





//from_date,to_date,type,description,status,admin_remarks
exports.add_request=(req,res)=>{
    
    var emp_id = req.user.id;
    var from_date = req.body.from;
    var to_date= req.body.to;
    var type = req.body.type;
    var desc = req.body.desc;
    var days = req.body.days;
    var status = "pending";
    var admin_remarks = "------";
    const q="INSERT INTO leave_request (emp_id,from_date,to_date,type,description,status,admin_remarks,days) VALUES (?,?,?,?,?,?,?,?);"
    db.query(q,[emp_id,from_date,to_date,type,desc,status,admin_remarks,days]).then(result=>{
        req.leave={
            from_date,
            to_date,
            type,
            desc,
            days
        }
        this.mail(req,res);
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}


exports.mail=(req,res)=>{
    var q="SELECT * FROM employee WHERE emp_id=?";
    db.query(q, req.user.id).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        result = result[0];
        var bid = result.branch_id;
        var q1="SELECT * FROM branch WHERE branch_id=?"
        db.query(q1,bid).then(result2=>{
            result2=JSON.parse(JSON.stringify(result2[0]));
            var tomail = result2[0].admin_email;
            nodemailerMailgun.sendMail({
                from: 'gowtham2mavuri@gmail.com',
                to: tomail, 
                subject: 'NEW LEAVE REQUEST',
                text:`NEW REQUEST FROM ${result.first_name} ${result.last_name}
                      Type : ${req.leave.type}  
                      Description : ${req.leave.desc} 
                      Days : ${req.leave.days}
                      From : ${req.leave.from_date} To: ${req.leave.to_date} `
              }, (err, info) => {
                if (err) {
                  console.log(`Error: ${err}`);
                  res.send({
                    error:false,
                    });
                }
                else {
                  res.send({
                    error:false,
                    });
                }
              });

        }).catch(err=>{
            console.log(err);
            res.send({
                error:false,
                });
        })
    }).catch(err=>{
        console.log(err);
        res.send({
            error:false,
            });
    })
}