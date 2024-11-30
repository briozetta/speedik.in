// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import createUserSlice from "./slices/createUserSlice"
import userFilter from "./slices/userFilter"
import carFilterDashboad from "./slices/carFilterDashboad"
import fileReducer  from "./slices/handleFileUploadSlice"

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: createUserSlice, 
    userFilter:userFilter,
    files:fileReducer ,
    carFilters:carFilterDashboad
   
  },
});

export default store;
