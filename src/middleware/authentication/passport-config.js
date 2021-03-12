const passport = require('passport');
var passportJWT = require("passport-jwt");
const { User } = require('../../db/db-connection').db;
const constants = require('../constants')

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
jwtOptions.secretOrKey = constants.SECRET;
jwtOptions.passReqToCallback = true

var strategy = new JwtStrategy(jwtOptions, async function (req, jwt_payload, next) {

  // usually this would be a database call:

  var user = User.findOne({ where: { "id": jwt_payload.id } });
 
  if (user) {
    next(null,user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);


module.exports = passport;