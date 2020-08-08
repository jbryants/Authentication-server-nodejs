const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// Using passport as our authentication middleware
// passport by default will try make a cookie based session
// since we need token based one, we set session as false.
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, function (req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
};
