import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логин пользователя
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
        navigate('/'); // Перенаправляем на главную страницу
      })
      .catch(error => {
        console.error('Ошибка при логине:', error);
      });
  };

  return (
    <div className="ad-form-container">
      <h1>Войти</h1>
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
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
