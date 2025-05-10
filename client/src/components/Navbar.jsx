import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Главная</Link>

      {token ? (
        <>
          {' | '}
          <Link to="/create">Создать объявление</Link>
          {' | '}
          <Link to="/my-ads">Мои объявления</Link>
          {' | '}
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Выйти
          </button>
        </>
      ) : (
        <>
          {' | '}
          <Link to="/login">Войти</Link>
          {' | '}
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
