// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import createUserSlice from "./slices/createUserSlice"
import userFilter from "./slices/userFilter"

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: createUserSlice, 
    userFilter:userFilter,
   
  },
});

export default store;
