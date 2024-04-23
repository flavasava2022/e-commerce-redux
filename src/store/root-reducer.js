import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { compareReducer } from "./compare/compare.reducer";
import { wishlistReducer } from "./wishlist/compare.reducer";

export const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer,
    compare:compareReducer,
    wishlist:wishlistReducer
})