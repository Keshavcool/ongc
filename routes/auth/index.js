const express = require('express');
const router = express.Router();
const conn = require('../../config/db');
const authMiddleware = require('../../middlewares/auth');


//using the auth middleware
router.use(authMiddleware);

//response object to be send on failure

//1.API for the signup Process
router.post('/signup',(req,res,next) => {
    
    //first check whether the email exists in the database
    const {email} = req.body;

    let query = `select id from members where email = '${email}'`;
    conn.query(query,(err,results) => {
        if(err){
            res.send({
                success : false,
                errorMsg : err.message
            });
            res.end();
        }
        else{
            if(results.length !== 0){
                res.send({
                    success : true,
                    message : 'Email Exits'
                });
                res.end();
            }
            else{
                req.body.isAdmin = 0;
                delete req.body.authsecretEmail;
                delete req.body.authsecretPassword;

                const {name,email,password,isAdmin} = req.body;

                query = `INSERT INTO members(name,email,password,isAdmin) VALUES('${name}','${email}','${password}','${isAdmin}')`;
                

                conn.query(query,req.body,(err,results) => {
                    let response;
                    if(err){

                        response = {
                            success : false,
                            errorMsg : err.message
                        };

                    }
                    else{
                        req.session.email = email;
                        req.session.idx = results.insertId;
                        response = {
                            success : true
                        };
                    }

                    res.send(response);
                    res.end();
                });
            }
        }
    });
});


//2.API for login
router.post('/login',(req,res,next) => {

    const { email , password } = req.body;
    const query = `select id,isAdmin from members where email = '${email}' and password = '${password}'`;

    conn.query(query,(err,results) => {
        if(err){
            res.send({
                success : false,
                errorMsg : err.message
            });
        }
        else{
            if(results.length === 0){
                res.send({
                    success : true,
                    message : 'Wrong Username and Password Combination'
                });
                res.end();
            }
            else{
                req.session.email = email;
                req.session.idx = results[0].id;
                res.send({
                    success : true,
                    isAdmin : results[0].isAdmin
                });
                res.end();
            }
        }
    });

});


//3.API for logout

router.post('/logout',(req,res,next) => {
    delete req.session.email;
    delete req.session.idx;
    res.send({
        success : true
    });
    res.end();
});

module.exports = router;