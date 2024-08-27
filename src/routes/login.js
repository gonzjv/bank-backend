import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
    res.send("Response on /login GET ")
});

export default router;