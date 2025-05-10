import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Home.css';

const Home = () => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const token = localStorage.getItem('token');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  let currentUserId = null;
  let isAdmin = false;

  // Если токен существует, декодируем и получаем данные
  if (token) {
    const decoded = jwtDecode(token);
    currentUserId = decoded.userId;
    isAdmin = decoded.isAdmin;
  }

  // Загружаем категории один раз
  useEffect(() => {
    axios.get('http://kurs-0cvz.onrender.com/api/ads/categories')
      .then(response => {
        console.log('Ответ от /categories:', response.data);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении категорий:', error);
      });
  }, []);

  // Загружаем объявления при изменении категории или страницы
  useEffect(() => {
    const url = selectedCategory
      ? `http://kurs-0cvz.onrender.com/api/ads?category=${encodeURIComponent(selectedCategory)}`
      : 'http://kurs-0cvz.onrender.com/api/ads';

    const params = {
      page,
      limit: 5,
    };
    if (selectedCategory) {
      params.category = selectedCategory;
    }

    axios.get(url, { params })
      .then(response => {
        setAds(response.data.ads);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('Ошибка при получении объявлений:', error);
      });
  }, [selectedCategory, page]);

  const handleDelete = (id) => {
    axios.delete(`http://kurs-0cvz.onrender.com/api/ads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setAds(prev => prev.filter(ad => ad._id !== id));
      })
      .catch(error => {
        console.error('Ошибка при удалении:', error);
      });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1); // сбрасываем на первую страницу при смене категории
  };

  return (
    <div className="home-container">
      <h1>Объявления</h1>
  
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Все категории</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
  
      <ul className="ads-list">
        {ads.map(ad => (
          <li key={ad._id}>
            <h2>{ad.title}</h2>
            <Link to={`/ads/${ad._id}`}>Подробнее</Link>
            {(ad.user._id === currentUserId || isAdmin) && (
              <>
                <button onClick={() => handleDelete(ad._id)}>Удалить</button>
                <Link to={`/edit/${ad._id}`}>Редактировать</Link>
              </>
            )}
          </li>
        ))}
      </ul>
  
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>
          Назад
        </button>
        <span>Страница {page} из {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(prev => prev + 1)}>
          Вперед
        </button>
      </div>
    </div>
  );
};

export default Home;
