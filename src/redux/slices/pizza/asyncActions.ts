import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63fec807370fe830d9d8c3e0.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
