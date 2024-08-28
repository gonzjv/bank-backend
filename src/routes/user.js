import bodyParser from "body-parser";
import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/login", function (req, res) {
    res.send("Response on /user/login GET ")
});

router.post("/signup", jsonParser, userController.userSignUp);


export default router;