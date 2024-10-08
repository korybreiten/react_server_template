const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

/*---------- Public Routes ----------*/
router.post('/join', usersCtrl.join);
router.post('/login', usersCtrl.login);
router.put('/:id', usersCtrl.update);
router.delete('/delete/:id', usersCtrl.deleteProfile);
router.get('/one/:id', usersCtrl.getOne);
router.get('/all', usersCtrl.getAll);


/*---------- Protected Routes ----------*/




module.exports = router;