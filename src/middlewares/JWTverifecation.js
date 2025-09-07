const jwt = require('jsonwebtoken');

const jwtVerifecation  =  (req,res,next)=>{
    try{
    const accesstoken = req.headers.authorization

    if(!accesstoken ) return req.status(401).send('access token not found')

      jwt.verify(accesstoken , process.env.jwt_secret , (err)=>{
        if(err) return res.status(401).send('Access token Expired')
        next()
    }); 
    
    }
    catch(err){
        console.log(err)
        res.status(501).send('Internal server error')
    }
}


module.exports = jwtVerifecation