import { createSelector } from "reselect"

 const categoriesData = (state)=>state.categories

export const categoriesArray = createSelector([categoriesData],(categories)=>categories.categories)
export const categoriesArrayIsLoading = createSelector([categoriesData],(categories)=>categories.isLoading)
export const categoriesArrayError = createSelector([categoriesData],(categories)=>categories.error)