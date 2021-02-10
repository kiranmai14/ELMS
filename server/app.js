require('dotenv').config();
process.env.TZ='Asia/Calcutta';
var express = require('express');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cors = require('cors');

global.__root   = __dirname + '/';

var app = express();
var db = require('./db');


var log = require('./controllers/loginController');
//Routers
var branchRouter = require('./routes/branch');
var adminRouter = require('./routes/admin');
var employeeRouter = require('./routes/employee');
var utils = require('./utils');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/admin',adminRouter);
app.use('/emp',employeeRouter);
app.use('/branch',branchRouter);

app.get('/auth',utils.verifyToken,(req,res)=>{
  res.send({
    message:'u r authenticated',
  });

})

app.post('/login',log.login);


app.get('/api', function (req, res) {
    res.status(200).send('API works.');
  });




app.get('/', (req, res) => {
   res.send('HOME');
})


module.exports = app;