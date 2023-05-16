const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const getAllUser = async (req, res, nxt) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        condole.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: 'No user found' });
    }
    return res.status(200).json({ users });
}

const registerValiations = [
    body('name').not().isEmpty().trim().withMessage('Name is required'),
    body('email').not().isEmpty().trim().withMessage('Email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters long'),
];

// router.post("/signup", userC.signup);
const signup = async (req, res, nxt) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(422).json({ errors: [{ msg: 'Email is already taken' }] });
    }
    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        console.log(err);
    }
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: err });
    }
    return res.status(201).json({ _id: newUser.id, user: newUser, message: 'User created successfully' });
}


const loginValiations = [
    body('email').not().isEmpty().trim().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
];

const login = async (req, res, nxt) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const matched = await bcrypt.compare(password, existingUser.password);
            if (matched) {
                return res.status(200).json({ _id: existingUser.id, user: existingUser, message: 'User logged in successfully' });
            }
            else {
                return res.status(401).json({ errors: [{ msg: 'Password is not correct' }] });
            }
        }
        else {
            return res.status(404).json({ errors: [{ msg: 'User not found' }] });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: err });
    }

}

module.exports = {
    getAllUser, signup, login, registerValiations, loginValiations
}