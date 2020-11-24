const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({msg: 'unauthorized to access.'});
    };

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
        return res.status(401).json({msg: 'verification failed, unauthorized to access.'});
    };

    req.user = verified.id;

    next();

    } catch (error) {
        res.status(500).json({error: error.message});
    };
};


module.exports = auth