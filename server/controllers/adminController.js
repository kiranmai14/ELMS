var db = require('../db');

//returns array of objects of {id,name,password,email}
exports.admin_list=(req,res)=>{
    const q="SELECT * FROM admin";
    db.query(q,(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
        res.json(result);
        }
    })
}


exports.admin_email=(req,res)=>{
    const email=req.params.email;
    const q="SELECT * FROM admin WHERE email=?";
    db.query(q,[email],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
        res.json(result[0]);
        }
    })
}

//get admin by id url=/admin/:id returns obj of {id,name,password,email}
exports.admin_id=(req,res)=>{
    const id=req.params.id;
    const q="SELECT * FROM admin WHERE id=?";
    db.query(q,[id],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
        res.json(result);
        }
    })
}

//adding an admin req.body={name,password,email}
exports.add_admin=(req,res)=>{
    console.log(req.body);
    var name=req.body.name;
    var password=req.body.password;
    var email=req.body.email;
    
    var q = 'INSERT INTO admin (name,password,email) VALUES (?,?,?)';

    db.query(q,[name,password,email],(err,result)=>{
        if(err){
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        }
        else{
        res.redirect('/admin/');
        }
    })
    
}

//updating an admin req.body={id,name,password,email}
exports.put_admin=(req,res)=>{
    console.log(req.body);
    var id=req.body.id;
    var name=req.body.name;
    var password=req.body.password;
    var email=req.body.email;
    console.log(id);
    var q = 'UPDATE admin SET name=?,password=?,email=? WHERE id=?';
    db.query(q,[name,password,email,id],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
        res.redirect('/admin/:'+{id});
        }
    })
}


exports.del_admin=(req,res)=>{
    console.log(req.body);
    var id=req.body.id;
    var q = 'DELETE FROM admin WHERE id=?';
    db.query(q,[id],(err,result)=>{
        if(err){
            console.log(err.sqlMessage);
            res.send(err.sqlMessage);
        }
        else{
        res.redirect('/admin/');
        }
    })
}