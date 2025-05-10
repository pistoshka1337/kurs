import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdForm.css';

const AdForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Вы не авторизованы');
      return;
    }

    try {
      await axios.post(
        'http://kurs-0cvz.onrender.com/api/ads',
        { title, description, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (error) {
      console.error('Ошибка при создании объявления:', error);
      alert('Ошибка при создании объявления');
    }
  };

  return (
    <div className="ad-form-container">
      <h2>Создать объявление</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <br />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default AdForm;
