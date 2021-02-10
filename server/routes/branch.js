var express = require('express');
var router = express.Router();

var utils = require('../utils');
//import Controllers
var adm= require('../controllers/adminController');
var branch=require('../controllers/branchController');
var dept = require('../controllers/departmentController');
var emp = require('../controllers/employeeController');
var req = require('../controllers/requestController');

//routes from /branch


router.post('/emps',utils.verifyToken,emp.emp_list);
router.post('/emp',utils.verifyToken,emp.emp_id);
router.post('/empUpdate',utils.verifyToken,emp.put_emp);
router.post('/empCreate',utils.verifyToken,emp.post_emp);
router.post('/empDelete',utils.verifyToken,emp.del_emp);

router.post('/depts',utils.verifyToken,dept.department_list);
router.post('/addDept',utils.verifyToken,dept.add_department);
router.post('/dept',utils.verifyToken,dept.update_department);
router.post('/deldept',utils.verifyToken,dept.del_department);



router.post('/empReqs',utils.verifyToken,req.req_list_emp);
router.post('/reqs',utils.verifyToken,req.request_list);
router.post('/reqUpdate',utils.verifyToken,req.put_request);//req_id also affects to change leave counts

module.exports = router;