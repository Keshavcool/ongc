
const userChecker = (req,res,next) => {
    if(req.session.email === undefined){

        res.send({
            error : true,
            errorMsg : 'Login First'
        });
        res.end();
    }
    else{
        
        if(req.session.email === 'admin@gmail.com'){
            next();
        }
        else{
            res.send({
                error : true,
                errorMsg : 'Not Authorized'
            });
            res.end();

        }
    }
};


module.exports = userChecker;