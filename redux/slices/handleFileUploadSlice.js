import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for file upload
export const uploadFiles = createAsyncThunk('files/upload', async (files, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i]);
    }

    const { data } = await axios.post('/api/upload-photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return data.files; // Assuming files come back with filename and URL
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Error uploading files');
  }
});

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    uploadedImages: [],
    primaryImage: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearUploadedImages: (state) => {
      state.uploadedImages = [];
      state.primaryImage = null;
    },
    
    deleteImage: (state, action) => {
      // Use the URL to filter out the image to delete
      const filteredImages = state.uploadedImages.filter(image => image.url !== action.payload);
      state.uploadedImages = filteredImages;
    
      // If the primary image is the one being deleted, reset it
      if (state.primaryImage === action.payload) {
        state.primaryImage = null;
      }
    },
    
    setPrimaryImage: (state, action) => {
      const primaryImageUrl = action.payload;
    console.log('redux image url---',primaryImageUrl);
    
      // Move the primary image to the front of the array
      const updatedImages = state.uploadedImages.filter(image => image.url !== primaryImageUrl);
      const primaryImage = state.uploadedImages.find(image => image.url === primaryImageUrl);
    
      // If the image is found, move it to the front and update the primary image
      if (primaryImage) {
        state.uploadedImages = [primaryImage, ...updatedImages]; // Place primary at the front
        state.primaryImage = primaryImageUrl;
      }
    },

    setUploadedImages: (state, action) => {
      state.uploadedImages = action.payload.map((link) => ({ url: link }));
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.uploadedImages = action.payload;
        state.isLoading = false;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUploadedImages, deleteImage, setPrimaryImage,setUploadedImages } = fileSlice.actions;
export default fileSlice.reducer;

