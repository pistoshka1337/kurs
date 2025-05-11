import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../styles/AdDetails.css';

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, [token]);

  useEffect(() => {
    // Загрузка объявления
    axios.get(`https://kurs-0cvz.onrender.com/api/ads/${id}`)
      .then(response => {
        setAd(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке объявления:', error);
      });

    // Загрузка комментариев
    axios.get(`https://kurs-0cvz.onrender.com/api/comments/${id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке комментариев:', error);
      });
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    axios.post(`https://kurs-0cvz.onrender.com/api/comments/${id}`, 
      { text: newComment },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(response => {
      setComments(prev => [response.data, ...prev]);
      setNewComment('');
    })
    .catch(error => {
      console.error('Ошибка при добавлении комментария:', error);
    });
  };

  // Функция для удаления объявления
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/ads/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        // Перенаправление на главную страницу после удаления
        navigate('/');
      })
      .catch(error => {
        console.error('Ошибка при удалении:', error);
      });
  };

  if (!ad) return <div>Загрузка...</div>;

  return (
    <div className="ad-details-container">
      <h1>{ad.title}</h1>
      <p><strong>Описание:</strong> {ad.description}</p>
      <p><strong>Категория:</strong> {ad.category}</p>
      <p className="ad-meta"><strong>Дата:</strong> {new Date(ad.date).toLocaleDateString()}</p>
      {userId === ad.user._id && (
        <div className="ad-actions">
          <Link to={`/edit/${ad._id}`} className="btn btn-edit">Редактировать</Link>
          <button onClick={handleDelete} className="btn btn-delete">Удалить</button>
        </div>
      )}
  
      <hr />
      <h2>Комментарии</h2>
  
      {token && (
        <div className="comment-form">
          <textarea
            rows="3"
            placeholder="Напишите комментарий..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Отправить</button>
        </div>
      )}
  
      {comments.length === 0 ? (
        <p>Комментариев пока нет.</p>
      ) : (
        <ul className="comment-list">
          {comments.map(comment => (
            <li key={comment._id}>
              <p>{comment.text}</p>
              <small>от {comment.user?.email || 'Пользователь'}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdDetails;
