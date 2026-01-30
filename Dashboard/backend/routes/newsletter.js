const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

router.get('/', newsletterController.getAllSubscriptions);
router.post('/', newsletterController.createSubscription);
router.delete('/:id', newsletterController.deleteSubscription);

module.exports = router;
