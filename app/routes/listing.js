const express = require('express');
const { createListing, deleteListing, updateListing, getListing, getListings } = require('../controllers/listing');
const { checkUserRef } = require('../utils/verifyUser');
const router = express.Router();

router.post('/create', checkUserRef, createListing);
router.delete('/delete/:id', deleteListing);
router.post('/update/:id', updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

module.exports = router;
