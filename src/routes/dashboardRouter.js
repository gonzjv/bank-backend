import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import {checkToken} from '../controllers/helpers.js'

const router = express.Router();

router.get("/", checkToken, dashboardController.indexHandler);
router.get("/transaction", checkToken, dashboardController.indexHandler);

export default router;