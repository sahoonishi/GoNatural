import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cartItems")) ?? [];
// console.log(initialState);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // console.log(state);
      // console.log(typeof(state));
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    deleteAll:()=>{
        return [];
;
    },
    incrementQuantity:(state, action)=> {
      state = state.map((item) => {
        
        if (item.id === action.payload) {
          
          item.quantity++;
          console.log(item.quantity);
        }
        return item;
      });
    },
    decrementQuantity: (state, action) => {
      state = state.map((item) => {
        if (item.quantity !== 1) {
          if (item.id === action.payload) {
            item.quantity--;
          }
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  deleteAll,
} = cartSlice.actions;

export default cartSlice.reducer;
