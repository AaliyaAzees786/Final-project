const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || '5e870ead1c4fbe469a320a7c5f2b288ac0c1166be51adc9fe2cacc8e5baa59edba2b093ffffd3bd501d7e85a62023d619035482264632d910f2274486de0ba9f';

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;
