import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import helpers from '../controllers/helpers.js'

const router = express.Router();

router.get("/", helpers.checkToken, dashboardController.indexHandler);

export default router;