module.exports = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      return next();  // Если пользователь администратор, пропускаем
    }
    return res.status(403).json({ message: 'Нет доступа' });  // Если нет, возвращаем ошибку
  };