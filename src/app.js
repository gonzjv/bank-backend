import express from "express";
import userRouter from "./routes/user.js"

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/user", userRouter);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
