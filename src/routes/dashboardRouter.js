import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import {checkToken} from '../controllers/helpers.js'

const router = express.Router();

router.get("/", checkToken, dashboardController.indexHandler);
router.post("/transaction", checkToken, dashboardController.transactionHandler);

export default router;