require("dotenv").config();
const express = require("express");
const cors = require("cors");
const excuseRoutes = require("./routes/excuseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", excuseRoutes);

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});