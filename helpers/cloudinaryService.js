const cloudinary = require("../configs/cloudinaryService");

const uploadToCloudinary = async({ mimetype, imageBuffer }) => {
  const dataUri = `data:${mimetype};base64,${imageBuffer.toString("base64")}`;
  return await cloudinary.uploader.upload(dataUri);
};

module.exports = { uploadToCloudinary };
