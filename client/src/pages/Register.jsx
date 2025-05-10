import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdForm.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Регистрация пользователя
    axios.post('http://kurs-0cvz.onrender.com/api/auth/register', { email, password })
      .then(response => {
        navigate('/login'); // Перенаправляем на страницу логина
      })
      .catch(error => {
        console.error('Ошибка при регистрации:', error);
      });
  };

  return (
    <div className="ad-form-container">
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
