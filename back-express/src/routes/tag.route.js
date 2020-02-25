const express = require("express");
const passport = require("passport");
const tagsController = require("../controllers/tags.controller");

const router = express.Router();
router.get("/", tagsController.find);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  tagsController.create
);
module.exports = router;
