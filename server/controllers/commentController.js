const Comment = require('../models/Comment');

// Добавление нового комментария
exports.addComment = async (req, res) => {
  try {
    // Создание нового комментария
    const comment = new Comment({
      text: req.body.text,          // Текст комментария
      user: req.userId,             // Идентификатор пользователя
      ad: req.params.adId           // Идентификатор объявления
    });

    // Сохранение комментария в базе данных
    await comment.save();

    // Ответ с добавленным комментарием
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
      .populate('user', 'email')     // Заполнение данных пользователя (email)
      .sort({ createdAt: -1 });      // Сортировка по дате создания (по убыванию)

    // Ответ с комментариями
    res.json(comments);
  } catch (err) {
    // Обработка ошибок
    res.status(500).json({
      message: 'Ошибка при получении комментариев',
      error: err.message
    });
  }
};
