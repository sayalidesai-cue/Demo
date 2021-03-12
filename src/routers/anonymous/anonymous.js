const router = require('express').Router();
const anonymousValidation = require('./anonymous-validator');
const {login,register}=require('../../controllers/anonymous/anonymous')

router.post('/register', anonymousValidation.registerVaildation(), register);

router.post('/login', anonymousValidation.loginValiation(), login);


module.exports = router;