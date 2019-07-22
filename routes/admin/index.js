const express = require('express');
const router = express.Router();
const conn = require('../../config/db');
const authChecker = require('../../middlewares/auth');
const adminChecker = require('../../middlewares/admin');


//using the authChecker and the adminChecker
router.use(authChecker);
router.use(adminChecker);


router.post('/data/:id',(req,res) => {

    const ref_id = req.params.id;
    const query = `select * from academics_info left join employee_info using(members_id) left join personal_info using(members_id)  where members_id = ${ref_id}`;

    conn.query(query,(err,results) => {
        if(err){
            res.send({
                error : true,
                errorMsg : err.message
            });
            res.end();
        }
        else{
            res.send(results);
            res.end();
        }
    });

});

router.post('/',(req,res) => {

    const query = `select * from members where id <> ${1} and status <> 2`;
    conn.query(query,(err,results) => {

        if(err){
            res.send({
                error : false,
                errorMsg : err.message
            });
        }
        else{
            delete results.password;
            delete results.isAdmin;
            res.send(results);
            res.end();
        }
    });


});


router.post('/adminAction',(req,res) => {

    const ref_id = req.body.id;
    const map = {
        'approved' : 2,
        'rejected' : 3
    };

    const status = map[req.body.action];

    const query = `update members set status = ${status} where id = ${ref_id}`;
    conn.query(query,(err) => {
        if(err){
            res.send({
                error : false,
                errorMsg : err.message
            });
        }
        else{
            res.send({
                success : true
            });
            res.end();
        }
    });
});







module.exports = router;