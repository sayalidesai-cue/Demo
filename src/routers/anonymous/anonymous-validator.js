const { check } = require('express-validator')

const registerVaildation = () => {

    return [
        check("firstName").isLength({ max: 255, min: 1 }).withMessage('Must be not blank and maximum 255 characters'),
        check("lastName").isLength({ max: 255, min: 1 }).withMessage('Must be not blank and maximum 255 characters'),
        check("username").isLength({ max: 255, min: 1 }).withMessage('Must be not blank and maximum 255 characters'),
        check("email").isEmail().withMessage('Must be a valid email')
    ];

}

const loginValiation = () => {
    return [
        check("username").not().isEmpty().withMessage('Username cannot be blank'),
        check("password").not().isEmpty().withMessage('Password cannot be blank')
    ];
}



module.exports = {
    registerVaildation,
    loginValiation
}