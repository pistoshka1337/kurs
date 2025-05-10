const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');

router.post('/:adId', auth, addComment);
router.get('/:adId', getComments);

module.exports = router;
