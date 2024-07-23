const express = require('express');
const authenticateJWT = require('../middlewares/authMiddleware'); // Adjust path as needed
const router = express.Router();

router.get('/userdata', authenticateJWT, (req, res) => {
    // Access user data using req.user
    res.send({ username: req.user.username, id: req.user.id });
});

module.exports = router;
