const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get('/welcome', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, you’re logged in!` });
});


module.exports = router;
