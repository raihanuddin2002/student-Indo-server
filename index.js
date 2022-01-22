const express = require("express");
const app = express();
const cors = require("cors");
const studentRouter = require("./routers/studentList");
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/studentList", studentRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);


module.exports = app;