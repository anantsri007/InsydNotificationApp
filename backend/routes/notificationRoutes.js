const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/create', notificationController.createNotification);
router.get('/user', notificationController.getNotifications);
router.post('/read', notificationController.markAsRead);

module.exports = router;
