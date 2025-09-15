const cloudinary = require('cloudinary').v2

    cloudinary.config({ 
        cloud_name: 'dorn2tiyl', 
        api_key: '325214164479862', 
        api_secret: 'pp5uWG8ynmAPXSQqW7lYsaewAZE' 
    });
    
    const uploadImage = async (file )=>{
     const uploadResult = await cloudinary.uploader.upload(file, {public_id:Date.now() ,})
       .catch((error) => {
           console.log(error);
       });

       
    
   return uploadResult
    


}

module.exports = uploadImage