import { createSelector } from "reselect"

 const carouselSlice = (state)=>state.carousel

export const carouselDataArray = createSelector([carouselSlice],(carousel)=>carousel.carouselData)
export const carouselDataArrayIsLoading = createSelector([carouselSlice],(carousel)=>carousel.isLoading)
export const carouselDataArrayError = createSelector([carouselSlice],(carousel)=>carousel.error)