var db = require('../db');

//returns array of objects of branches
exports.branch_list=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }
    const q="SELECT * FROM branch";
    db.query(q).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}

//get branch by id url=/branch/:id returns obj 
exports.branch_id=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }
    const id=req.body.id;
    const q="SELECT * FROM branch WHERE branch_id=?";
    db.query(q,[id]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}

//adding a branch req.body={name,password,email}
exports.post_branch=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }

    var id= req.body.id;
    var name= req.body.name;
    var location = req.body.location;
    var adminName=req.body.adminName;
    var adminPassword=req.body.adminPassword;
    var adminEmail=req.body.adminEmail;
    var q = 'INSERT INTO branch (branch_id,name,location,admin_name,admin_password,admin_email) VALUES (?,?,?,?,?,?)';
    db.query(q,[id,name,location,adminName,adminPassword,adminEmail]).then(result=>{
        res.send({
            error:false
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}

//update a branch
exports.put_branch=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }

    var id= req.body.id;
    var name= req.body.name;
    var location = req.body.location;
    var adminName=req.body.adminName;
    var adminPassword=req.body.adminPassword;
    var adminEmail=req.body.adminEmail;
    
    var q = 'UPDATE branch SET name=?,location=?,admin_name=?,admin_password=?,admin_email=? WHERE branch_id=?';
    db.query(q,[name,location,adminName,adminPassword,adminEmail,id]).then(result=>{
        this.branch_id(req,res);
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}

exports.del_branch=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }
    var id=req.body.branchId;
    var q = 'DELETE FROM branch WHERE branch_id=?';
    db.query(q,[id]).then(result=>{
        res.send({
            error:false
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}