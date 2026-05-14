require("dotenv").config();

const express = require("express");
const cors = require("cors");

const excuseRoutes = require("./routes/excuseRoutes");

const app = express();

app.use(cors({
  origin: "https://excuses-dun.vercel.app",
  credentials: true
}));

app.use(express.json());

app.use("/", excuseRoutes);

app.get("/", (req, res) => {
  res.send("Backend working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});