var db = require('../db');

//return depts in a branch
//address:/branch/depts
//USED
exports.department_list=(req,res)=>{
    var branchId;
    if(req.user.role === "admin")
        branchId = req.body.id;
    else if (req.user.role === "subadmin")
        branchId= req.user.id;
    const q="SELECT * FROM department WHERE branch_id=?";
    db.query(q,[branchId]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result,
            branchId
        });
    }).catch(err=>{
        console.log(err.sqlMessage);
        res.send({
            error:true,
            message:err.sqlMessage
        });
    })
}

//used
exports.add_department=(req,res)=>{
    var branchId;
    if(req.user.role === "admin")
        branchId = req.body.id;
    else if (req.user.role === "subadmin")
        branchId= req.user.id;
    var code = req.body.code;
    var name= req.body.name;
    var shortName=req.body.shortName;

    var q = 'INSERT INTO department (branch_id,code,name,short_name) VALUES (?,?,?,?)';
    db.query(q,[branchId,code,name,shortName]).then(result=>{
            this.department_id(req,res);
    }).catch(err=>{
            console.log(err);
            var error=err.code;
            res.send({error:true,message:error});
    })
}


//address:/department/:code
//used
exports.department_id=(req,res)=>{
    const code= req.body.code;
    const q="SELECT * FROM department WHERE code=?";
    db.query(q,[code]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err);
        var error=err.code;
        res.send({error:true,message:error});
    });
}



//used
exports.update_department=(req,res)=>{
    var code = req.body.code;
    var name= req.body.name;
    var shortName=req.body.shortName;

    var q = 'UPDATE department  SET name=?,short_name=? WHERE code=?';
    db.query(q,[name,shortName,code]).then(result=>{
        this.department_id(req,res);
    }).catch(err=>{
        var error=err.code;
        res.send({error:true,message:error});
    });
}

//used
exports.del_department=(req,res)=>{
    var code=req.body.code;
    var q = 'DELETE FROM department WHERE code=?';
    db.query(q,[code]).then(result=>{
        res.send('OK');
    }).catch(err=>{
        var error=err.code;
        res.send({error:true,message:error});
    });
}




