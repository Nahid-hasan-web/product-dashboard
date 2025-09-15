const uploadImage = require("../helpers/uploadImage")

const addCatagory = (req ,res)=>{
    // const {catagoryImage} = req.body
    
    res.send(req.file)
    uploadImage(req.file.path)
    .then((res)=>console.log(res , 'ok'))
    .catch((err)=>console.log(err))


    

}

module.exports = {addCatagory}