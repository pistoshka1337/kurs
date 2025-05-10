import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AdForm.css';

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Получаем данные объявления по ID
    axios.get(`http://localhost:5000/api/ads/${id}`)
      .then(response => {
        const ad = response.data;
        setTitle(ad.title);
        setDescription(ad.description);
        setCategory(ad.category);
      })
      .catch(error => {
        console.error('Ошибка при получении объявления:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAd = { title, description, category };

    axios.patch(`http://localhost:5000/api/ads/${id}`, updatedAd, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      navigate('/');
    })
    .catch(error => {
      console.error('Ошибка при редактировании объявления:', error);
    });
  };

  return (
    <div className="ad-form-container">
      <h1>Редактировать объявление</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Заголовок" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
        <textarea 
          placeholder="Описание" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder="Категория" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required
        />
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default EditAd;
