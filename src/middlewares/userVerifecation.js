const checkRole = (userRole)=>{
     return (req,res,next)=>{
          if(userRole.includes(req.user.role)){
               next()
          }else{
               res.status(401).send('user is not valid for the feature')
          }
     }
}

module.exports= checkRole