const express = require('express');
const { google, signOut, signin, signup } = require('../controllers/auth');
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut);

module.exports = router;
