const express = require('express');
const { deleteUser, updateUser, getUserListings, getUser } = require('../controllers/user');
const { verifyToken } = require('../utils/verifyUser');
const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

module.exports = router;
