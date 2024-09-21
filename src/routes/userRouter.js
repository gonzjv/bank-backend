import bodyParser from "body-parser";
import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/signup", jsonParser, userController.userSignUp);
router.post("/confirmation", jsonParser, userController.userConfirm);
router.post("/login", jsonParser, userController.login);

export default router;