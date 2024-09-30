
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Async thunk to handle the form submission
export const submitForm = createAsyncThunk(
  '/sign-up',
  async ({firstName,lastName,contact,password }, { rejectWithValue }) => {
   
    try {
      const response = await axios.post('/api/sign-up', {
        firstName,
        lastName,
        contact,
        password
      });
      return response.data; // Return only the data
    } catch (error) {
      // If error contains a response, return its data; otherwise, return a generic error
      return rejectWithValue(error.response ? error.response.data : 'Something went wrong');
    }
  }
);
