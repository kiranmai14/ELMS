// generate token using secret from process.env.JWT_SECRET

var jwt = require('jsonwebtoken');
var db= require('./db');

// generate token and return it
var generateToken=(user)=> {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  if (!user) return null;
 
  var u = {
    id: user.id,
    role: user.role,
    email: user.email
  };
 
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}
 

var verifyToken = (req, res,next) => {
  var token = req.body.token;
  if (!token) 
  {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) 
  {
    if (err) 
      return res.status(401).json({
        error: true,
        message: "Invalid token."
      });
    var role = decoded.role;
    var q;
    if( role === 'admin')
      q="SELECT * FROM admin WHERE email=?";
    else if( role === 'subadmin' )
      q="SELECT * FROM branch WHERE admin_email=?";
    else if( role === 'employee')
      q="SELECT * FROM employee WHERE email=?"
    else
    {
      res.send({ error: true, message: "Invalid Token" });
    }
    db.query(q,[decoded.email]).then((result)=>
    {
      result=JSON.parse(JSON.stringify(result[0]))[0];
      
      if(!result)
      {
        return res.status(401).json({
          error: true,
          message: "Invalid User."
        })
      }
      var email ;
      if(role === 'admin')
        email= result.email;
      else if(role === 'subadmin')
        email= result.admin_email;
      else if(role === 'employee')
        email= result.email;
        // return 401 status if the userId does not match.
        if (email !== decoded.email) {
          return res.status(401).json({
            error: true,
            message: "Invalid user."
          });
        }
        // get basic user details
        req.user=decoded;
        next();
    }).catch((err)=>{
      console.log(err);
      res.send(err);
    })
  })
}


module.exports = {
  generateToken,
  verifyToken
}