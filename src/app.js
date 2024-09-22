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

// Define the CORS options
/* 
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5173', 'http://localhost:80'] // Whitelist the domains you want to allow
};
*/

//app.use(cors(corsOptions));
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
}).on('error', (err)=>{console.log(err)});
