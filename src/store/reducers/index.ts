import { combineReducers, Reducer } from "redux";
import { RouterState } from "redux-first-history";
import authReducer, { AuthState } from "./auth.reducer";
import categoryReducer, { CategoryState } from "./category.reducer";
import productReducer, { ProductState } from "./product.reducer";

export interface AppState {
  router: RouterState;
  auth: AuthState;
  category: CategoryState;
  product: ProductState;
}

export default (routerReducer: Reducer<RouterState>) =>
  combineReducers({
    router: routerReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  });
