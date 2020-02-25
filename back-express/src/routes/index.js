"use strict";
const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const technosRouter = require("./technos.route");
const tagsRouter = require("./tag.route");

router.get("/status", (req, res) => {
  res.send({ status: "OK" });
});

router.use(authRouter);
router.use("/technos", technosRouter);
router.use("/tags", tagsRouter);

module.exports = router;
