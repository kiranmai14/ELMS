var express = require('express');
var router = express.Router();
var utils = require('../utils');

//import Controllers
var adm= require('../controllers/adminController');
var branch=require('../controllers/branchController');
var dept = require('../controllers/departmentController');
var emp = require('../controllers/employeeController');
var request = require('../controllers/requestController');
var holiday = require('../controllers/holidaysController');

router.get('/:email',utils.verifyToken,adm.admin_email);
router.post('/branches',utils.verifyToken,branch.branch_list);
router.post('/branch',utils.verifyToken,branch.branch_id);
router.post('/branchUpdate',utils.verifyToken,branch.put_branch);
router.post('/branchAdd',utils.verifyToken,branch.post_branch);
router.post('/branchDel',utils.verifyToken,branch.del_branch);
router.post('/holidays',utils.verifyToken,holiday.add);
router.post('/holidaysGet',utils.verifyToken,holiday.fetch);
router.post('/holidaysDel',utils.verifyToken,holiday.del);


module.exports = router;