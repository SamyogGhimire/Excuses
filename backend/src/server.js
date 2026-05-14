require("dotenv").config();

const express = require("express");
const cors = require("cors");

const excuseRoutes = require("./routes/excuseRoutes");

const app = express();

const corsOptions = {
  origin: "https://excuses-dun.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.options("(.*)", cors(corsOptions)); // ✅ Express 5 compatible
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", excuseRoutes);

app.get("/", (req, res) => {
  res.send("Backend working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});