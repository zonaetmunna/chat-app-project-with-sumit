/* descriptions */
// external imports
const express = require("express");
// internal imports
const { getUsers } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
