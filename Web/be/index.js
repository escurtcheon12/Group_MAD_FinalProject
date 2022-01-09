const express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routers/user");
const post = require("./routers/post");
const comment = require("./routers/comment");
const env = require("dotenv");
const db = require("./config/db");
env.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(express.json());
app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/comment", comment);

app.listen(process.env.PORT, () => {
  console.log(`app running in http://localhost:${process.env.PORT} `);
});
