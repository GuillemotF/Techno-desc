const express = require("express");
const passport = require("passport");
const multer = require("multer");
const technosController = require("../controllers/technos.controller");

const upload = multer();

const router = express.Router();
router.get("/", technosController.find);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("img"),
  technosController.create
);
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("img"),
  technosController.update
);
module.exports = router;
