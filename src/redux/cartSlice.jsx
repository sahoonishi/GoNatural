import { createSlice } from "@reduxjs/toolkit";
const initialstate=[];

 export const cartSlice = createSlice({
  name: "cart",
  initialstate,
  reducers: {
    increment(state, action){
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity++;
        }
      });
      return item;
    },
    removeFromCart(state, action){
      return state.filter((item) => item.id !== action.payload.id);
    },
    addtocart(state, action){
      state.push(action.payload);
    },
    decrement(state, action){
      state.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1) {
          item.quantity--;
        }
      });
      return item;
    }
  },
});

export const { increment, decrement, removeFromCart,addtocart } = cartSlice.actions;
export default cartSlice.reducer;
