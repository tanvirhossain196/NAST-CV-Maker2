// initial code
"use strict";
console.clear();

// main code

let app = require("./app");
let chalk = require("chalk");
const { connectDB } = require("./model/user.model");

let port = 3000;

app.listen(port, async function () {
  console.log(
    chalk.bgRed.white.bold(`Server is running at http://localhost:${port}`)
  );

  await connectDB();
});
