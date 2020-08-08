const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// passport by default will try make a cookie based session
// since we need token based one, we set session as false.
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, function (req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signup", Authentication.signup);
};
