const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
require('dotenv').config();
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

module.exports.cloud=(req, res, next)=> {
    if(req.file){
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function uploadFile(req) {
        let result = await streamUpload(req);
        req.body[req.file.fieldname]=result.url
        next();
    }

    uploadFile(req);
    }
    else{
      next();
    }
}
