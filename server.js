const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const mealPlanRoutes = require("./routes/mealPlan");
const recipeRoutes = require("./routes/recipe");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });

//Passport config
require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// Use forms for PUT / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
      mongooseConnection: mongoose.connection,
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
app.use("/recipe", recipeRoutes);
app.use("/mealPlan", mealPlanRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Connection Successful: Server running on port ${process.env.PORT}`
  );
});
