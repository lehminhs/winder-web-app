import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h"});
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });

        console.log(error);
    }
}

export const signUp = async (req, res) => {
    const { confirmPassword, email, firstName, lastName, password, googleId } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            if (!isAuth) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                return res.status(200).json({ message: "User exists. Proceeding to Login." });
            }
        }

        if (password != confirmPassword) return res.status(400).json({ message: "Password don't match." })

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({ email, googleId, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: "1h"});
        res.status(200).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'something went wrong' });

        console.log(error);
    }
}

export const fetchUsers = async (req, res) => { 
    try {
        const Users = await User.find();
        const master = Users.map((user) => {
            return {
                id: user._id,
                name: user.name
            }
        })

        res.status(200).json(master);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const fetchUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const user = await User.findOne({ googleId: id });
        const master = user._id
        
        res.status(200).json(master);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}