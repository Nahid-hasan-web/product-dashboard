const chekUserrole = (userRole)=>{

    return (  (req,res,next)=>{

            if(!req.user) return res.send('unauthorize no user found')

            if(userRole.includes(req.user.role)){
                next()
           }else{
                res.status(401).send('user is not allow for this feature')
           }

        })
}
module.exports  = chekUserrole