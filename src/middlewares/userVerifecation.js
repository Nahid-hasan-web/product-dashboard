const checkRole = (userRole)=>{
   return  (req,res,next)=>{
          if(userRole.includes(req.user.role)) {
               next()
          }else{
               res.status(401).send('user is unauthorize for the feature')
          }
     }
}

module.exports= checkRole