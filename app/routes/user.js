const express = require('express');
const { deleteUser, updateUser, getUserListings, getUser } = require('../controllers/user');
const router = express.Router();

router.post('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/listings/:id', getUserListings);
router.get('/:id', getUser);

module.exports = router;
