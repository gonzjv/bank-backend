import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import {checkToken} from '../controllers/helpers.js'
import bodyParser from "body-parser";

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, checkToken, dashboardController.indexHandler);
router.post("/transaction",jsonParser,  checkToken, dashboardController.transactionHandler);

export default router;