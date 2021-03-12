const userManagement = require('../routers/user/user-management');
const anonymous=require('../routers/anonymous/anonymous')

module.exports = (app,passport) => {  
    const passportAuth = passport.authenticate('jwt', {session:false})
    app.use('/users', passportAuth,userManagement);
    app.use('/',anonymous);
};