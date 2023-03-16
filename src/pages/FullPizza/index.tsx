import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ButtonBack } from '../../components/ButtonBack';
import styles from './FullPizza.module.scss';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
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
    return <>Loading...</>;
  }
  return (
    <div className="container">
      <div className={styles.fullPizza}>
        <img
          className={styles.fullPizza__img}
          src={pizza.imageUrl}
          alt="Pizza"
        />
        <h2 className={styles.fullPizza__title}>{pizza.title}</h2>
        <h4 className={styles.fullPizza__price}>
          Стоимость: {pizza.price} руб.
        </h4>
        <ButtonBack />
      </div>
    </div>
  );
};
