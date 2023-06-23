const express = require('express');
const router = express.Router();
const employeeController = require('../../Controllers/employeesConrollers');
const ROLES_LIST = require('../../Config folder/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
 .get(employeeController.getAllEmployeees)
 .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeeController.createNewEmployee)
 .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeeController.updateEmployee)
 .delete(verifyRoles(ROLES_LIST.Admin),employeeController.deleteEmployee);

 router.route('/:id')
.get(employeeController.getAllEmployeees);

module.exports= router;