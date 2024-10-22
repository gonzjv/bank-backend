import express from "express";
import cors from 'cors';
import userRouter from "./routes/userRouter.js"
import dashboardRouter from "./routes/dashboardRouter.js"
import { connectToMongo } from "./utils/mongoose.js";
import 'dotenv/config'

const app = express();
// use .ENV variable. dotenv package
// const port = 3000;
const port = process.env.PORT;
await connectToMongo();

app.use(cors());
app.use(express.static("public"));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
}).on('error', (err)=>{console.log(err)});
