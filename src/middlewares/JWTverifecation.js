const jwt = require('jsonwebtoken');

const jwtVerifecation  =  (req,res,next)=>{
    try{
    const accesstoken = req.headers.authorization

    if(!accesstoken ) return req.status(401).send('access token not found')

      jwt.verify(accesstoken , process.env.jwt_secret , (err , decoded)=>{
        if(err) return res.status(401).send('Access token Expired')
        req.user = decoded
        next()
    }); 
    
    }
    catch(err){
        console.log(err)
        res.status(501).send('Internal server error')
    }
}


module.exports = jwtVerifecation