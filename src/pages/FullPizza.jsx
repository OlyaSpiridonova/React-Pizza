import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://63fec807370fe830d9d8c3e0.mockapi.io/items/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при загрузке данных!');
        navigate('/');
      }
    }

    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza) {
    return 'Loading...';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} р</h4>
    </div>
  );
};
