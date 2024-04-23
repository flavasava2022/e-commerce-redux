import { createSelector } from "reselect"

 const compareData = (state)=>state.compare

export const compareListData = createSelector([compareData],(compare)=>compare.compareData)