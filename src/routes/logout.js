import express from "express";

const router = express.Router();

router.delete("/", function (req, res) {
    res.send("Response on /logout DELETE ")
});

export default router;