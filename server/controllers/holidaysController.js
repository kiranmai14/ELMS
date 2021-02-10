var db = require('../db');


exports.add=(req,res)=>{
    var q='INSERT INTO holidays (date,event) VALUES (?,?)'
    var date=req.body.date;
    var desc=req.body.desc;
    db.query(q,[date,desc]).then(result=>{
        this.fetch(req,res);
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true
        });
    })
}

exports.fetch=(req,res)=>{
    var q='SELECT * FROM holidays ORDER BY date DESC'
    db.query(q).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true
        });
    })
}

exports.del=(req,res)=>{
    const date=req.body.date;
    var q='DELETE FROM holidays WHERE date=?';
    db.query(q,date).then(result=>{
        this.fetch(req,res);
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true
        });
    })
}