const express = require('express');
const { createForm, getFormsByUser, updateForm, getFormById, getFormsByTitle } = require('../controllers/formController');
const { restrictTo } = require('../middlewares/authMiddleware');
const { addResponse, responsesByFormId } = require('../controllers/responseController');
const router = express.Router();

router.get('/list', restrictTo(), getFormsByUser);
router.post('/add', restrictTo(), createForm);
router.put('/update', restrictTo(), updateForm);

router.get('/:formId', getFormById);
router.get('/search/:query', getFormsByTitle);

router.post('/response/add', addResponse);
router.get('/response/:formId', responsesByFormId);

module.exports = router;