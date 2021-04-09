const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
var router = express.Router();

/**
 * @route POST api/users
 * @desc Register User
 * @access Public
 */
router.post('/',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Please enter valid mail').isEmail(),
        check('password', 'Password length should be greater then 6').isLength({ min: 6 })
    ],
    async (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 'errors': errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            const userInfo = await User.findOne({ email });
            // Check user already exist
            if (userInfo) {
                return res.status(400).send({ errors: [{ msg: 'User Already Exist' }] });
            }
            // Get Profile Image from Gravatar URL
            const avatar = await gravatar.url(email, {
                s: 200,
                r: 'pg',
                mm: 'mm'
            });
            const newUser = new User({
                name,
                email,
                avatar,
                password
            });
            // Encrypt User Password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            newUser.password = hash;

            await newUser.save();// push to database

            // Return JSON web token
            const payload = {
                user: {
                    id: newUser.id
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