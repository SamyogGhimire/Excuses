const express = require("express");

const router = express.Router();

const {
  generateExcuse
} = require("../controllers/excuseController");

router.post("/generate", generateExcuse);

module.exports = router;