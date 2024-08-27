import express from "express";
import loginRouter from "./routes/login.js"
import logoutRouter from "./routes/logout.js"
import signupRouter from "./routes/signup.js"

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
