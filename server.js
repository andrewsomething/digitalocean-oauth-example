// server.js
// where your node app starts

// set up github passport for oauth
// see https://github.com/jaredhanson/passport-twitter
var passport = require("passport");
var DigitalOceanStrategy = require("passport-digitalocean").Strategy;

// the process.env values are set in .env
passport.use(
  new DigitalOceanStrategy(
    {
      clientID: process.env.DIGITALOCEAN_CLIENT_ID,
      clientSecret: process.env.DIGITALOCEAN_SECRET,
      callbackURL:
        "https://" +
        process.env.PROJECT_DOMAIN +
        ".glitch.me/login/digitalocean/return",
      scope: "read"
    },
    function(token, tokenSecret, profile, cb) {
      return cb(null, profile);
    }
  )
);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// init project
var express = require("express");
var app = express();
var expressSession = require("express-session");

// cookies are used to save authentication
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  expressSession({
    secret: "observingboats",
    resave: true,
    saveUninitialized: true,
    maxAge: 90 * 24 * 3600000
  })
);
app.use(passport.initialize());
app.use(passport.session());

// index route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// on clicking "logoff" the cookie is cleared
app.get("/logoff", function(req, res) {
  res.clearCookie("digitalocean-passport-example");
  res.redirect("/");
});

app.get("/auth/digitalocean", passport.authenticate("digitalocean", { scope: 'read' }));

app.get("/login/digitalocean/return",
  passport.authorize('digitalocean', { failureRedirect: '/failure.html' }),
  function(req, res) {
    res.cookie("digitalocean-passport-example", new Date());
    res.redirect('/success');
  }
);

// if cookie exists, success. otherwise, user is redirected to index
app.get("/success", requireLogin, function(req, res) {
  if (req.cookies["digitalocean-passport-example"]) {
    res.sendFile(__dirname + "/views/success.html");
  } else {
    res.redirect("/");
  }
});

function requireLogin(req, res, next) {
  if (!req.cookies["digitalocean-passport-example"]) {
    res.redirect("/");
  } else {
    next();
  }
}

function requireUser(req, res, next) {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
