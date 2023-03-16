import React, { useRef } from 'react';
import qs from 'qs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { listSort, SortPopup } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/slices/pizza/types';
import { RootState, useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { categoryId, searchValue, sort, currentPage } = useSelector(
    (state: RootState) => state.filter
  );

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        category,
        order,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  //Если изменили параметры и был первый рендер
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
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = listSort.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || listSort[0],
        })
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить пиццы</p>
          <p>Попробуйте повторить запрос позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};
