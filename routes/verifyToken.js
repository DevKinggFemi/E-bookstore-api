const jwt = require ("jsonwebtoken");
const verification = (req,res,next)=> {
    console.log("header", req.headers.token)
    const authHeader = req.headers.token;
    if(authHeader)
    {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err,user) =>{
            if(err) res.status(403).json("token is not valid");
        req.user = user;
        next();
        })
        } else {
            return res.status(401).json("Your are not authenticated!");
        }
    }

    const verifyTokenAndAuthorization =(req,res,next)=> {
        verification(req, res, () =>{
          console.log("params",req.params.userId )
          console.log("database",req.user.id )
            if(req.user.id === req.params.userId){
                next();
            }
           
            else{
                res.status(403).json("You are not allowed to do this");
            }
        });
    };
    
    const verifyAdmin =(req,res,next)=>{
        verification(req, res, () =>{
            if( req.user.id === req.params.id ){
                next();
            }
            else{
                res.status(403).json("You are not allowed to do this");
            }
        });

    }
module.exports = {verification, verifyTokenAndAuthorization, verifyAdmin};
