const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createAd,
  getAds,
  getAd,
  getMyAds,
  getCategories,
  updateAd,
  deleteAd
} = require('../controllers/adController');

router.get('/categories', getCategories);
router.get('/my', auth, getMyAds);
router.get('/:id', getAd);
router.get('/', getAds);

router.post('/', auth, createAd);
router.patch('/:id', auth, updateAd);
router.delete('/:id', auth, deleteAd);

module.exports = router;