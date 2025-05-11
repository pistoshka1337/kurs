const Comment = require('../models/Comment');

// Добавление нового комментария
exports.addComment = async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,          
      user: req.userId,            
      ad: req.params.adId          
    });

    // Сохранение комментария в базе данных
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    // Обработка ошибок
    res.status(500).json({
      message: 'Ошибка при добавлении комментария',
      error: err.message
    });
  }
};

// Получение комментариев для конкретного объявления
exports.getComments = async (req, res) => {
  try {
    // Поиск комментариев для конкретного объявления
    const comments = await Comment.find({ ad: req.params.adId })
      .populate('user', 'email')     
      .sort({ createdAt: -1 });      

    res.json(comments);
  } catch (err) {
    // Обработка ошибок
    res.status(500).json({
      message: 'Ошибка при получении комментариев',
      error: err.message
    });
  }
};
