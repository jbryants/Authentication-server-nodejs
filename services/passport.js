const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local");

// Create local strategy - for handling login authentication
// By default localStrategy checks the username and password fields
// as we have email field instead of username, we need to specify that in the options.
const localOptions = { usernameField: "email" };
const localLogin = new localStrategy(localOptions, function (
  email,
  password,
  done
) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // compare password - is 'password' equal to 'user.password'
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

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
passport.use(localLogin);
