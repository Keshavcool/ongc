//to check whether a incomming request has a email and password associated with it
const authChecker = (req,res,next) => {
    
    const username = req.body.authsecretEmail;
    const password = req.body.authsecretPassword;

    if(username === process.env.EMAIL && password === process.env.PASSWORD){
        next();
    }
    else{
        const response = {
            error : true,
            errorMsg : 'You are not authorized to access this route'
        };
    
        res.send(response);
        res.end();
    }
    
};

module.exports = authChecker;