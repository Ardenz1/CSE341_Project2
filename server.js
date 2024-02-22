const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/db.config");
const recipesRouter = require("./routes/recipeRoutes");


// authentication
const { auth, requiresAuth } = require("express-openid-connect");

const port = process.env.PORT || 8080;
const app = express();

// authentication
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Middleware to redirect unauthenticated users to the login page
const redirectToLogin = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    // Redirect unauthenticated users to the login page
    return res.redirect("/login");
  }
  // If authenticated, proceed to the next middleware or route handler
  next();
};

// redirect if not authorized 
app.use("/profile", redirectToLogin);
app.use("/recipes", redirectToLogin);

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});


app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// get the recipes
app.use("/recipes", recipesRouter);

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
