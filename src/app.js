import express from "express";
import userRouter from "./routes/user.js"

const app = express();
// use .ENV variable. dotenv package
const port = 3000;

app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
}).on('error', (err)=>{console.log(err)});
