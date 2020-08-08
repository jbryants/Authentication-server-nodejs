const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
  // specifying from where to find the Jwt
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  // for decoding the Jwt, giving the secret
  secretOrKey: config.secret,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if user ID in the payload exists in our database
  // If it does, call 'done' with that user object
  // otherwise, call 'done' without a user object

  User.findById(payload.sub, function (err, user) {
    // if search failed
    if (err) {
      return done(err, false);
    }

    if (user) {
      // if user found
      done(null, user);
    } else {
      // if user not found
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
