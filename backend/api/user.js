const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    const { username } = req.body;

    function encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    req.body.password = encryptPassword(req.body.password);

    try {
        if (await User.findOne({ username }))
            return res.status(400).send({ error: 'User already exists' });

        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({ user });
    } catch (err) {
        return res.status(500).send({ error: 'Registration failed' });
    };
};

async function authUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username }).select('+password');

        if (!user)
            return res.send({ error: 'User not found' });

        if (!bcrypt.compareSync(password, user.password))
            return res.send({ error: 'Invalid password' })

        user.password = undefined;

        return res.send({ user });
    } catch (err) {
        return res.status(500).send({ error: 'Error on server' });
    };
};

async function getUser(req, res) {
    const { username } = req.body;

    try {
        if (!username) {
            const users = await User.find()
            return res.status(200).send({ users });
        }

        const user = await User.findOne({ username })
         
        if (!user) 
            return res.status(400).send({ error: 'User not found' });

        return res.status(200).send({ user });
    } catch (err) {
        res.status(500).send({ error: 'Error on server' });
    };
};

module.exports = {
    registerUser,
    authUser,
    getUser
};