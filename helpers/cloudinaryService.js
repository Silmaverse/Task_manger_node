const cloudinary = require("../configs/cloudinaryService");

const uploadToCloudinary = async ({ mimetype, imageBuffer }) => {
  const dataUri = `data:${mimetype};base64,${imageBuffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataUri);
  return result;
};

const destroyFromCloudinary = (url) => {
  let publicid = url.split("/").pop().split(".").shift();
  console.log(publicid);
  cloudinary.uploader
    .destroy(publicid, { invalidate: true })
    .then((result) => {
      if(result){
        console.log("Clodinary result:",result)
      }
    });
};

module.exports = { uploadToCloudinary, destroyFromCloudinary };
