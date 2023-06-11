const express = require('express');
const router = express.Router();
const {checkAuthMiddleware} = require("../middleware/auth");
const {
    getEmployeesList,
    getEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee
} = require("./controllers/employees");

router.get('/', checkAuthMiddleware, getEmployeesList);
router.get('/:id', checkAuthMiddleware, getEmployee);
router.post('/', checkAuthMiddleware, addEmployee);
router.put('/:id', checkAuthMiddleware, updateEmployee);
router.delete('/:id', checkAuthMiddleware, deleteEmployee);

module.exports = router;
