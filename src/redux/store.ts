import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filter/slice';
import cartSlice from './slices/cart/slice';
import pizzaSlice from './slices/pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
