const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const {validationResult} = require("express-validator");
const mongoose = require('mongoose');

module.exports = {

    async signup (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        
        const { username = null, email = null, password = null, recipes = [] } = req.body;
        try {
            const tmp = await User.findOne({ email });
            if (tmp) 
                return res.status(400).json({ msg: "User Already Exists" });
            
            const user = new User({ username, email, password, recipes });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            
            jwt.sign( {user: { id: user.id }}, "randomString", 
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    },

    async login (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) 
            return res.status(400).json({ errors: errors.array() });
        
        const { email = null, password = null } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user)
                return res.status(400).json({ message: "User Not Exist" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ message: "Incorrect Password !" });

            jwt.sign({ user: { id: user.id }}, "randomString", { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({token});
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "Server Error"});
        }
    },

    async getLoggedInUsers (req, res, next) {
        try {
            const user = await User.findById(req.user.id);
            res.json(user);
        } catch (e) {
            res.send({ message: "Error in Fetching user" });
        }
    },

    /*async getAll(req, res, next) {
        const result = await User.find({});
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },
    
    async getById(req, res, next) {
        const id = req.query.id;
        if (Number.isNaN(id)) {
            res.status(404).send('id not found');
            return;
        }
        const result = await User.findById({ id });
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('id not found');
        }
    },
    
    async update(req, res, next) {
        const { id = null } = req.params.id;
        const { firstName = null, lastName = null, username = null, password = null } = req.body;
        if (req.body.password) {
            hash = bcrypt.hashSync(userParam.password, 10);
        }
        const result = await User.updateOne({ id }, { firstName, lastName, username, password, hash });
        if (result) {
            res.json(`item ${id} udated successfully!`);
            console.log(`item ${id} udated successfully!`);
        } else {
            res.status(404).send('not found');
        }
    },

    async _delete(req, res, next) {
        const id = req.query.id;
        if (Number.isNaN(id)) {
            res.status(404).send('id not found');
            return;
        }
        const result = await User.deleteOne({ id });
        if (result){
            res.send("deleted successfully");
            console.log(`${id} deleted successfully`);
        } else {
            res.status(404).send('id not found');
        }
    }*/
};
