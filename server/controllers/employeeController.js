var db = require('../db');

//path:branch/:id/reqs
//USED
exports.emp_list=(req,res)=>{
    var branchId;
    if(req.user.role === "admin")
        branchId = req.body.id;
    else 
        branchId= req.user.id;
    const q="SELECT * FROM employee WHERE branch_id=? ORDER BY dept_code";
    db.query(q,[branchId]).then((result)=>{
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

exports.emp_id=(req,res)=>{
    var role = req.user.role;
    var emp_id,q;
    if(role === 'employee')
    {
        emp_id=req.user.id;
        q="SELECT * FROM employee WHERE emp_id=?";
        
    }
    else 
    {
        emp_id=req.body.empId;
        q="SELECT * FROM employee WHERE emp_id=? ";
    }
    db.query(q,emp_id).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log('error in emp_id');
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}


exports.put_emp=(req,res)=>{
    var branchId;
    if(req.user.role === "admin")
        branchId = req.body.id;
    else 
        branchId= req.user.id;
    var deptCode = req.body.deptCode;
    var empId =req.body.empId;
    var role = req.body.role;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password =req.body.password;
    var gender = req.body.gender;
    var DOB = req.body.DOB;
    var city = req.body.city;
    var country = req.body.country;
    var address = req.body.address;
    var phone = req.body.phone;
    var casualLeaves = req.body.casualLeaves;
    var sickLeaves =req.body.sickLeaves;
    var unpaidLeaves = req.body.unpaidLeaves;
    var q = 'UPDATE employee SET branch_id=?,dept_code=?,role=?,first_name=?,last_name=?,email=?,password=?,gender=?,dob=?,country=?,city=?,address=?,phone_number=?,casual_leaves=?,sick_leaves=?,unpaid_leaves=? WHERE emp_id=?';
    db.query(q,[branchId,deptCode,role,firstName,lastName,email,password,gender,DOB,country,city,address,phone,casualLeaves,sickLeaves,unpaidLeaves,empId])
    .then(result=>{
        this.emp_id(req,res);
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}


exports.post_emp=(req,res)=>{
    var branchId;
    if(req.user.role === "admin")
        branchId = req.body.id;
    else 
        branchId= req.user.id;
    var deptCode = req.body.deptCode;
    var empId =req.body.empId;
    var role = req.body.role;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password =req.body.password;
    var gender = req.body.gender;
    var DOB = req.body.DOB;
    var city = req.body.city;
    var country = req.body.country;
    var address = req.body.address;
    var phone = req.body.phone;
    var casualLeaves = req.body.casualLeaves;
    var sickLeaves =req.body.sickLeaves;
    var unpaidLeaves = req.body.unpaidLeaves;
    var q = 'INSERT INTO employee (branch_id,dept_code,emp_id,role,first_name,last_name,email,password,gender,dob,country,city,address,phone_number,casual_leaves,sick_leaves,unpaid_leaves) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    db.query(q,[branchId,deptCode,empId,role,firstName,lastName,email,password,gender,DOB,country,city,address,phone,casualLeaves,sickLeaves,unpaidLeaves])
    .then(result=>{
        res.send({
            error:false
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}

exports.del_emp=(req,res)=>{
    var id=req.body.empId;
    var q = 'DELETE FROM employee WHERE emp_id=?';
    db.query(q,[id]).then(result=>{
        res.send({
            error:false
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}

