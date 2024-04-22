const express = require('express');
const router = express.Router();
const uploadController = require('../Controllers/fileController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/api/upload', upload.single('file'), uploadController.uploadFile);
router.get('/api/uploaded-files', uploadController.getUploadedFiles);
router.get('/api/uploaded-files/download/:filename', uploadController.downloadFiles);

module.exports = router;




module.exports = router; 
