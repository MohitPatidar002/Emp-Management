const express = require('express');
const router = express.Router();

const {createDepartment, getAllDepartment, deleteDepartment, assingDepartment} = require('../Controllers/department.controller.js')

router.post('/createDepartment', createDepartment)
router.get('/getAllDepartment', getAllDepartment)
router.delete('/deleteDepartment', deleteDepartment)
router.post('/assingDepartment', assingDepartment)

module.exports = router;
