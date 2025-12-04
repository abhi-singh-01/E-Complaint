const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage for profile pictures
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecomplain/students/profile-pictures',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'face' },
      { quality: 'auto', fetch_format: 'auto' }
    ],
    public_id: (req, file) => {
      // Use student ID from authenticated user
      const studentId = req.user?._id || 'temp';
      return `student-${studentId}-${Date.now()}`;
    }
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Helper function to delete image from Cloudinary
const deleteImage = async (imageUrl) => {
  try {
    if (!imageUrl) return false;

    // Extract public_id from Cloudinary URL
    // Cloudinary URLs format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{ext}
    // or: https://res.cloudinary.com/{cloud_name}/image/upload/{transformation}/{folder}/{public_id}.{ext}
    let publicId = imageUrl;

    // If it's a full URL, extract the public_id
    if (imageUrl.includes('cloudinary.com')) {
      // Match the path after /upload/ or /v{version}/
      const urlMatch = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.(jpg|jpeg|png|gif|webp))?$/);
      if (urlMatch) {
        publicId = urlMatch[1];
        // Remove file extension if present
        publicId = publicId.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
      }
    }

    // Destroy the image
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
};

module.exports = {
  cloudinary,
  upload,
  deleteImage
};

