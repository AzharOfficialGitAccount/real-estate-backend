const express = require('express');
const { createListing, deleteListing, updateListing, getListing, getListings } = require('../controllers/listing');
const { verifyToken, checkUserRef } = require('../utils/verifyUser');
const router = express.Router();

router.post('/create', verifyToken, checkUserRef, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

module.exports = router;
