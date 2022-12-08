import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.APT_KEY,
  api_secret: process.env.API_SECRET,
}); 

export { cloudinary }
