const express = require("express");
const router = express.Router();

const { containLetter } = require("../controllers/Letter/LetterController");

router.route("/is-contain-letters").post(containLetter);

module.exports = router;
