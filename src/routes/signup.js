import express from "express";

const router = express.Router();

router.post("/", function (req, res) {
    res.send("Response on /signup POST ")
});

export default router;