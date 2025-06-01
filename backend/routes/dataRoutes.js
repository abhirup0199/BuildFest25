const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Import controllers (to be implemented)
const dataController = require('../controllers/dataController');

// Routes
router.post('/upload', upload.single('file'), dataController.uploadData);
router.get('/sources', dataController.getDataSources);
router.get('/preview/:sourceId', dataController.previewData);
router.post('/analyze', dataController.analyzeData);

module.exports = router;