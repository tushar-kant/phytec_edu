const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser =require('cookie-parser');
const app = express();
const path = require('path'); 
app.use(cookieParser());


dotenv.config({ path: './config.env' });
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));//router file

const PORT = process.env.PORT || 5000;


//middleware
const middleware = (req, res, next) => {
    console.log(`hello middle`);
    next();
}




app.get('/about', middleware, (req, res) => {
    console.log(`hello about `);
    res.send(`hello about from the server`);
});


app.get('/contact', (req, res) => {
    res.send(`hello  contact from the server`);
});

app.get('/signin', (req, res) => {
    res.send(`hello log in world fromthe server`);
});

app.get('/signup', (req, res) => {
    res.send(`hello  registration from the server`);
});

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});



app.listen(PORT, () => {
    console.log(`server is listening ${PORT}`);
})