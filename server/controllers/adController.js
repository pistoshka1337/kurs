const Ad = require('../models/Ad');

exports.createAd = async (req, res) => {
  try {
    const ad = new Ad({ ...req.body, user: req.userId });
    await ad.save();
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании', error: err.message });
  }
};

exports.getAds = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // текущая страница
    const limit = parseInt(req.query.limit) || 5; // объявлений на страницу
    const category = req.query.category;

    const query = category ? { category } : {};

    const total = await Ad.countDocuments(query);
    const ads = await Ad.find(query)
      .populate('user', 'email')
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      ads
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении', error: err.message });
  }
};


exports.getAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('user', 'email');
    if (!ad) return res.status(404).json({ message: 'Объявление не найдено' });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении объявления', error: err.message });
  }
};

exports.getMyAds = async (req, res) => {
  try {
    const myAds = await Ad.find({ user: req.userId }).populate('user', 'email');
    res.json(myAds);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении ваших объявлений', error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const ads = await Ad.find().select('category');
    const categories = [...new Set(ads.map(ad => ad.category).filter(Boolean))];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении категорий', error: err.message });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Объявление не найдено' });

    //if (ad.user.toString() !== req.userId) return res.status(403).json({ message: 'Нет доступа' });
    if (ad.user.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Нет доступа' });
    }

    Object.assign(ad, req.body);
    await ad.save();
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при обновлении', error: err.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Объявление не найдено' });
    //if (ad.user.toString() !== req.userId) return res.status(403).json({ message: 'Нет доступа' });
    if (ad.user.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Нет доступа' });
    }

    await ad.deleteOne();
    res.json({ message: 'Удалено' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении', error: err.message });
  }
};