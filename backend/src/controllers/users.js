const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

function generateToken(params) {
    return jwt.sign(params, tokenSecret, {
        expiresIn: 86400
    });
};

module.exports = {
    async show(req, res) {
        const { user: { id } } = req.body;

        try {
            if (!id) {
                const users = await User.find()
                return res.status(200).json({ users });
            };

            const user = await User.findOne(id);

            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            };

            return res.status(200).json({ user });
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },

    async create(req, res) {
        const { username, password, confirmPassword } = req.body;

        try {
            if (password !== confirmPassword) {
                return res.json({ error: 'Different passwords' })
            };
            delete req.body.confirmPassword

            req.body.password = encryptPassword(req.body.password);

            const existsUser = await User.findOne({ username });
            if (existsUser) {
                return res.status(400).json({ error: 'User already exists' });
            };

            const user = await User.create(req.body);
            user.password = undefined;

            return res.status(200).json({
                user,
                token: generateToken({ id: user.id })
            });
        } catch (err) {
            return res.status(500).json({ error: 'Registration failed' });
        };
    },

    async auth(req, res, next) {
        const { token } = req.body;

        if (!token) return res.status(401).json({ error: 'Access Denied' });

        try {
            const verified = jwt.verify(token, tokenSecret)

            req.body.user = verified;

            next();
        } catch (err) {
            return res.status(400).json({ error: 'Invalid Token' });
        };
    },

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username }).select('+password');

            if (!user) {
                return res.json({ error: 'User not found' });
            };

            // Comparing passwords
            if (!bcrypt.compareSync(password, user.password)) {
                return res.json({ error: 'Invalid password' });
            };
            user.password = undefined;

            return res.status(200).json({ user });
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' });
        };
    },

    async update(req, res) {
        const { username } = req.body;
        delete req.body.username;

        try {
            if (!username) {
                return res.json({ error: 'Username undefined' });
            };

            const existsUser = await User.findOne({ username });
            if (!existsUser) {
                return res.json({ error: 'Username not exists' });
            };

            const user = await User.findOneAndUpdate({ username }, req.body, { new: true })

            return res.status(200).json({ user })
        } catch (err) {
            return res.status(500).json({ error: 'Error on server' })
        };
    },
};
