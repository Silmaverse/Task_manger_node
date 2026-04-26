const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: 'dpmkmpjfd', 
  api_key: '182574958546327', 
  api_secret: '0pQlJ7h3TbzOqu4JsDccRhFTdxw'
});

module.exports=cloudinary;