const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const clientController = require('../controllers/clientController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/clients/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.get('/', clientController.getAllClients);
router.post('/', upload.single('image'), clientController.createClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
