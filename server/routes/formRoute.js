const express = require('express');
const { createForm, getFormsByUser, updateForm, getFormById } = require('../controllers/formController');
const { restrictTo } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/list', restrictTo(), getFormsByUser);
router.post('/add', restrictTo(), createForm);
router.put('/update', restrictTo(), updateForm);

router.get('/:formId', getFormById);

router.post('/response/add');

module.exports = router;