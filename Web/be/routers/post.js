const express = require("express");
const db = require("../config/db");
const env = require("dotenv");
env.config();
const router = express.Router();

router.get("/list", (req, res) => {
  db.query("SELECT * FROM post", (err, result) => {
    res.json({
      code: result ? 202 : 404,
      status: result ? "succes" : "error",
      loginStatus: result.length > 0 ? "succes" : "none",
      data: result,
    });
  });
});

module.exports = router;
