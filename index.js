const functions = require("firebase-functions");

let dotenv = require("dotenv");

//config dotenv
dotenv.config({ path: "Config/config.env" });

let app = require("./app");
//const firebase = require("firebase");

//connect to database

//server at port

exports.app =functions.https.onRequest(app)

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running at port:${process.env.PORT}`);
});

//Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down server due to uncaught ecxeption");
  server.close(() => {
    process.exit(1);
  });
});


//unhandeled promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
