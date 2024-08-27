// const cloudinary = require('cloudinary').v2
// const streamifier = require('streamifier')
// require('dotenv').config();
// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.API_KEY, 
//     api_secret: process.env.API_SECRET
// });

let streamUpload=require('../../helpers/streamUpload.helper')
module.exports.cloud=(req, res, next)=> {
    if(req.file){
      const uploadToCloudinary = async (buffer) => {
        const result = await streamUpload(buffer);
        req.body[req.file.fieldname] = result.url;
        next();
      }
      uploadToCloudinary(req.file.buffer);
    }
    else{
      next();
    }
}
