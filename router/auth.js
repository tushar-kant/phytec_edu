const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticate = require("../middleware/authenticate");

const router = express.Router();

require('../db/conn');
const User = require("../model/userSchema");


//registration
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "pls  fill the field properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();
            res.status(201).json({ message: "successfully registered" });

        }


    } catch (err) {
        console.log(err);
    }


});

//login
router.post('/signin', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "please fill the data" })
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);


            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "invalid credientials " });
            }
            else {
                res.json({ message: "user signin successful" });
            }

        } else {
            res.status(400).json({ error: "invalid credientials " });

        }

    } catch (err) {
        console.log(err);
    }
});

router.get('/about', authenticate, (req, res) => {
    console.log(`hello about t`);
    res.send(req.rootUser);
});

router.get('/getdata', authenticate, (req, res) => {

    console.log(`hello get t`);
    res.send(req.rootUser);
});


router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "please fill the contact form" });
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "user contact successfully" });
        }


    } catch (error) {
        console.log(error);
    }

});
router.get('/logout', (req, res) => {
    console.log(`hello my logout page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User logout');
});



module.exports = router;