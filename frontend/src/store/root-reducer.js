import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { compareReducer } from "./compare/compare.reducer";
import { wishListReducer} from "./wishlist/wishlist.reducer";
import { categoriesReducer } from "./category/categories.reducer";
import { carouselReducer } from "./category/carousel/carousel.reducer";

export const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer,
    compare:compareReducer,
    wishlist:wishListReducer,
    categories:categoriesReducer,
    carousel:carouselReducer
})