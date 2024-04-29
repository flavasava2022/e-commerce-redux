import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const getAllCategories = createAsyncThunk("GET_ALL_CATEGORIES", async () => {
  try {
    const response = await axios.get(
      "https://fake-e-commerce-api.onrender.com/categories/"
    );
    let data = []
      response.data.map(category=>{
        data = [
              ...data,
              {
                label: category,
                key: category,
              },
            ];
      });
    return data;
  } catch (error) {
    // Handle errors here
    return error;
  }
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    }).addCase(getAllCategories.pending, (state, action) => {
state.isLoading = true
    }).addCase(getAllCategories.rejected, (state, action) => {
state.isLoading = false
state.error = action.pa
    })
  },
});


export const categoriesReducer = categoriesSlice.reducer