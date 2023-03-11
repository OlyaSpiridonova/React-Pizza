import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const updateTotalPrice = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      updateTotalPrice(state);
    },
    deleteItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      updateTotalPrice(state);
      findItem.count === 0 ? (findItem.count = 0) : findItem.count--;
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      updateTotalPrice(state);
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, deleteItem, clearItems } =
  cartSlice.actions;
export default cartSlice.reducer;
