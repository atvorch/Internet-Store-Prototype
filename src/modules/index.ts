import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import cart from "./cart";
import goods from "./goods";
import general from "./general";

export const rootReducer: any = combineReducers({
  general: general.reducer,
  cart: cart.reducer,
  goods: goods.reducer,
});

export function initStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

export type RootState = ReturnType<typeof rootReducer>;
