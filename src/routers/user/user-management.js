
const router = require('express').Router()
const {welcome}=require('../../controllers/user/user')

router.get('/welcome', welcome);


module.exports = router;