var koa = require("koa");
var app = module.exports = koa();
var routes = require("koa-route");
var fs = require("fs");
var https = require("https");
var httpPort = 3000;
var httpsPort = 8081;

// routes
var userRoutes = require("./userRoutes.js");
app.use(routes.post("/user", userRoutes.add));
app.use(routes.get("/user/:id", userRoutes.get));
app.use(routes.put("/user/:id", userRoutes.update));
app.use(routes.del("/user/:id", userRoutes.remove));

// Fire it up

//listen on HTTP Port
app.listen(httpPort);
console.log("The app is listening. Port 3000");


var options = {
    key: fs.readFileSync("tls/key.pem").toString(),
    cert: fs.readFileSync("tls/cert.pem").toString()
};

var httpsServer = https.createServer(options, app.callback());

//listen on HTTPS Port

httpsServer.listen(httpsPort, function() {
    console.log("HTTPS listening on port " + httpsPort);
});

