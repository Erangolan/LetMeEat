const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const usersController = require('../controllers/user');

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/getLoggedInUsers', auth, usersController.getLoggedInUsers);


/*router.get('/getAll', usersController.getAll);
router.post("/getById", usersController.getById);
router.get('/update', usersController.update);
router.delete('/delete', usersController._delete);*/

module.exports = router;

