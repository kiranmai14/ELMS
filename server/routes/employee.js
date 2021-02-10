var express = require('express');
var router = express.Router();
var utils = require('../utils');
//import Controllers
var adm= require('../controllers/adminController');
var branch=require('../controllers/branchController');
var dept = require('../controllers/departmentController');
var emp = require('../controllers/employeeController');
var req = require('../controllers/requestController');

//routes from /emp


router.post('/profile',utils.verifyToken,emp.emp_id);
router.post('/reqs',utils.verifyToken,req.req_list_emp);
router.post('/req',utils.verifyToken,req.add_request);

module.exports = router;