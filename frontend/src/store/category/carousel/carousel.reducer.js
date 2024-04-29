import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CAROUSEL_INITIAL_STATE = {
  carouselData: [],
  isLoading: false,
  error: null,
};

export const getCarouselData = createAsyncThunk("GET_CAROUSEL_DATA", async (category) => {
  try {
    const response = await axios.get(
      `https://fake-e-commerce-api.onrender.com/product/subcategory/${category}`
    );

    return response.data;
  } catch (error) {
    // Handle errors here
    return error;
  }
});

export const carouselSlice = createSlice({
  name: "carousel",
  initialState: CAROUSEL_INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(getCarouselData.fulfilled, (state, action) => {
      state.carouselData = action.payload
      state.isLoading = false
    }).addCase(getCarouselData.pending, (state, action) => {
state.isLoading = true
    }).addCase(getCarouselData.rejected, (state, action) => {
state.isLoading = false
state.error = action.pa
    })
  },
});


export const carouselReducer = carouselSlice.reducer