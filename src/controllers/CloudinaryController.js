// Require the Cloudinary library
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

const uploadImage = async(req,res) => {
    
    if(req.files){
        const image = req.files.file;
        let result = await cloudinary.uploader.upload(image.tempFilePath); 
        return res.status(200).json({
            'message' : "Successfully uploaded image",
            'url': result.secure_url
        });
    }
    return res.status(400).json({
        file : "Image file is required"
    });
    
}

module.exports = {
    uploadImage
}