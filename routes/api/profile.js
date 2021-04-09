const express = require('express');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const Post = require('../../models/Post');

var router = express.Router();

/**
 * @route GET api/profile/me
 * @desc Get curent user profile
 * @access Private
 */
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ errors: 'Profile Not Found' });
        }
        res.send(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route POST api/profile
 * @desc Create or Update Profile For Current User
 * @access Private
 */
router.post('/',
    [
        auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            company,
            location,
            website,
            status,
            skills,
            bio,
            gitHubUserName,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Construct profile fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) {
            profileFields.company = company;
        }
        if (location) {
            profileFields.location = location;
        }
        if (website) {
            profileFields.website = website;
        }
        profileFields.status = status;
        if (skills) {
            profileFields.skills = skills.split(',').map((val) => val.trim());
        }
        if (bio) {
            profileFields.bio = bio;
        }
        if (gitHubUserName) {
            profileFields.gitHubUserName = gitHubUserName;
        }
        // Populate social fields
        profileFields.social = {};
        if (youtube) {
            profileFields.social.youtube = youtube;
        }
        if (facebook) {
            profileFields.social.facebook = facebook;
        }
        if (twitter) {
            profileFields.social.twitter = twitter;
        }
        if (instagram) {
            profileFields.social.instagram = instagram;
        }
        if (linkedin) {
            profileFields.social.linkedin = linkedin;
        }
        try {
            let profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
            if (!profile) {
                // Create new one
                const newProfile = new Profile(profileFields);
                await (await newProfile.save()).populate('user', ['name', 'avatar']);
                return res.send(newProfile);
            }
            // Update exisitng profi
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            ).populate('user', ['name', 'avatar']);
            return res.send(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);
/**
 * @route GET api/profile
 * @desc Get All User Profiles
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        return res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route GET api/profile/user/:userid
 * @desc Get profile and users by user id
 * @access Public
 */
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ errors: 'Profile Not Found' });
        }
        res.send(profile);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ errors: 'Profile Not Found' });
        }
        return res.status(500).send('Server Error');
    }
});

/**
 * @route DELETE api/profile
 * @desc Delete Profile, Users and Posts
 * @access Private
 */
router.delete('/', auth, async (req, res) => {
    try {
        await Post.deleteMany({ user: req.user.id });
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User and Profiles details are deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route PUT api/profile/experience
 * @desc Add experience to profile
 * @access Private
 */
router.put('/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From Date is required').not().isEmpty(),
            check('current', 'Current is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const {
            title,
            company,
            from,
            to,
            current,
            description,
            location
        } = req.body;
        const newExp = {
            title,
            company,
            from,
            to,
            current,
            description,
            location
        };
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

/**
 * @route DELETE api/profile/experience/:exp_id
 * @desc Delete experience in profile
 * @access Private
 */
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.experience.findIndex((value) => {
            return value._id == req.params.exp_id
        });
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route PUT api/profile/education
 * @desc Add education to profile
 * @access Private
 */
router.put('/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('from', 'From Date is required').not().isEmpty(),
            check('current', 'Current is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const {
            school,
            degree,
            fieldOfStudy,
            from,
            to,
            current,
            description
        } = req.body;
        const newEdu = {
            school,
            degree,
            fieldOfStudy,
            from,
            to,
            current,
            description
        };
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEdu);
            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

/**
 * @route DELETE api/profile/education/:edu_id
 * @desc Delete education in profile
 * @access Private
 */
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.findIndex((value) => {
            return value._id == req.params.edu_id
        });
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route GET api/profile/github/:username
 * @desc Get repositories from Github using Github user name
 * @access Public
 */
router.get('/github/:username', async (req, res) => {
    try {
        const option = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(option, (err, response, body) => {
            if (err) {
                console.error(err);
            }
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'Github profile not found' });
            }
            return res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;