const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const adminRoute = require('./routes/admin');
const session = require('express-session');


//setting up the cors and parser for upcomming data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended : true } ));

//File uploading code 
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'./marksheets/');
    },
    filename  : (req,file,cb) => {
        cb(null,file.fieldname + '-' + Date.now());
    }
});

const upload = multer({storage : storage});

//managing the sessions
app.use(session({
    secret : process.env.SECRET,
    saveUninitialized : true,
    resave : true
}));


app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/admin',adminRoute);





//starting the server
const port = process.env.PORT || 3000;
app.listen(3000,() => {
    console.log(`Listening on the port ${port}`);
});