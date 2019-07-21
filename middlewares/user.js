const userChecker = (req,res,next) => {

    if(req.session.email === undefined){

        res.send({
            error : true,
            errorMsg : 'Login First'
        });
        res.end();
    }
    else{
        next();
    }
};


module.exports = userChecker;