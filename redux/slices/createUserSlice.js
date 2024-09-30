import { createSlice } from '@reduxjs/toolkit';
import { submitForm } from '../api/userThunks';


const createUserSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createUserSlice.reducer;
