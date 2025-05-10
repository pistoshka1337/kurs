import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAds.css';

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем все объявления текущего пользователя
    axios.get('http://kurs-0cvz.onrender.com/api/ads/my', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setAds(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке моих объявлений:', error);
      });
  }, []);

  const handleEdit = (id) => {
    // Переход на страницу редактирования
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://kurs-0cvz.onrender.com/api/ads/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      setAds(prev => prev.filter(ad => ad._id !== id));
    })
    .catch(error => {
      console.error('Ошибка при удалении:', error);
    });
  };

  return (
    <div className="my-ads-container">
      <h1>Мои объявления</h1>
      {ads.length === 0 ? (
        <p className="empty-message">У вас нет объявлений</p>
      ) : (
        ads.map(ad => (
          <div key={ad._id} className="ad-card">
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            <p>Категория: {ad.category}</p>
            <button onClick={() => handleEdit(ad._id)}>Редактировать</button>
            <button onClick={() => handleDelete(ad._id)}>Удалить</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAds;
