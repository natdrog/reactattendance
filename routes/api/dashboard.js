const express = require("express");
const router = express.Router();

// @route   GET api/dashboard/login
// @desc    Tests profile route
// @access  Public
router.get("/dashboard", (req, res) => res.json({ msg: "Dashboard Works" }));

module.exports = router;
