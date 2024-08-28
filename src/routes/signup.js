import bodyParser from "body-parser";
import express from "express";
import {StatusCodes} from 'http-status-codes'

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, function (req, res) {
    console.log("req.body", req.body);
    const userExist = false;
    
    if (true === userExist) {
        res.status(StatusCodes.NOT_ACCEPTABLE).send("ERROR: user already esists")
    } else {
        res.status(StatusCodes.OK).send("SUCCESS: user registered")
    }
});

export default router;