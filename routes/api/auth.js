const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const user = require('../../models/Users');
const authMiddleware = require('../../middlewares/auth');


const { check, validationResult } = require('express-validator');
var router = express.Router();

/**
 * @route GET api/get
 * @desc Test route
 * @access Public
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        let userInfo = await user.findById(req.user.id).select('-password');
        res.json(userInfo);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

/**
 * @route POST api/auth
 * @desc Authenticate user and get token
 * @access Public
 */
router.post('/',
    [
        check('email', 'Please enter email').isEmail(),
        check('password', 'Please enter password').exists()
    ],
    async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 'errors': errors.array() });
        }
        const { email, password } = req.body;
        try {
            const userInfo = await User.findOne({ email });
            if (!userInfo) {
                return res.status(400).send({ errors: [{ msg: 'Invalid Credential' }] });
            }
            // Decrypt User Password
            const isMatch = await bcrypt.compare(password, userInfo.password)
            if (!isMatch) {
                res.status(401).json({ errors: [{ msg: 'Invalid Credential' }] })
            }
            // Return JSON web token
            const payload = {
                user: {
                    id: userInfo.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600000 },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    return res.json({ token })
                }
            );
        } catch (err) {
            return res.status(500).send(err.message);
        }
    });

module.exports = router;