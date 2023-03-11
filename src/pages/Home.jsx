import React, { useRef } from 'react';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { listSort, Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, searchValue, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      axios
        .get(
          `https://63fec807370fe830d9d8c3e0.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = listSort.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizzaItem) => (
              <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
            ))}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};
