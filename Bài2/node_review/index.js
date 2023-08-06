const express = require("express");
const { connectToDb, db } = require("./db");
const apiRoutes = require("./api");

const app = express();

app.use(apiRoutes);

app.listen(3000, () => {
  console.log("App is running at 3000");
  connectToDb();
});
