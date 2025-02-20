import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (existingItem) {
        existingItem.qty += 1; // Increase quantity if item already exists
      } else {
        state.items.push({ ...action.payload, qty: 1 }); // Add new item with qty = 1
      }
    },
    decreaseItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.card.info.id === action.payload
      );
      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1; // Reduce quantity
        } else {
          state.items = state.items.filter(
            (item) => item.card.info.id !== action.payload
          ); // Remove item if qty = 0
        }
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.card.info.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, decreaseItem, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
