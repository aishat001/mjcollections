import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


const generateId = () => {
  const uniqueId = uuidv4();
  // Use the uniqueId as needed
  return uniqueId;
}

const initialState = {
  items: [],
  quantity: 0,
  bill: 0,
  id: generateId()
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      
      state.quantity += newItem.quantity;
      state.bill += newItem.price * newItem.quantity;
      

      // state.quantity += 1;
      // state.bill += action.payload.price * action.payload.quantity;
      // if (!state.items) {
      //     state.items = [];
      //   }
      //   state.items.push(action.payload);

    },
    removeItem: (state, action) => {
      const itemId = action.payload
      const existingItem = state.items.find(item => item.itemId === itemId)
      if (existingItem) {
        state.quantity -= existingItem.quantity;
        state.bill -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.itemId !== itemId)
      }
      if (state.items.length === 0) {
        state.bill = 0;
        state.quantity = 0;
      }
    },
    resetCart: (state) => {
      state.items = []
      state.quantity = 0
      state.bill = 0
      state.id = generateId(); // Generate a new ID when resetting the cart

    },

  },
})


export const { addItem, removeItem, resetCart } = cartSlice.actions
export default cartSlice.reducer;