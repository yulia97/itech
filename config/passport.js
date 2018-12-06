let User = require('../models/User.js').User

var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

module.exports = function (passport) {
    var jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    
    jwtOptions.secretOrKey = '38c07082-f8fe-11e8-8eb2-f2801f1b9fd1';

    var strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {	
	try {
	    console.log('dasdad', jwt_payload.id)
	    let user = await User.findOne({_id: jwt_payload.id});
	    
	    if (user) {
		next(null, user);
	    } else {
		next(null, false);
	    }
	} catch (e){
	    next(null, false);
	}
	
    });
    passport.use(strategy);
};
