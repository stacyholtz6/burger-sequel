var express = require('express');

var app = express();

var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public/assets"));

// requiring models for syncing
var db = require('./models');

// express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set handlebars
var exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.engine("handlebars", exphbs({
//   defaultLayout: "main",
//   log: function (something) {
//     console.log(something);
//   }
// }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller");

app.use(routes);

// syncing sequelize models and starting out Express app
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
  });
})

