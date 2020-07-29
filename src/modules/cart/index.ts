import { RootState } from "modules";
import { Reducer } from "redux";
import { Goods } from "data/types";
import { ThunkAction } from "redux-thunk";

export interface CartItem {
  item: Goods;
  quantity: number;
}
export type CartItems = {
  [itemId: string]: CartItem;
};

export interface CartState {
  total: number;
  items: CartItems;
}

const defaultState: CartState = {
  total: 0,
  items: {},
};

const CartActions = {
  SetItem: "cardModule/setItem",
  Remove: "cardModule/delete",
} as const;

interface CartSetItemAction {
  type: typeof CartActions.SetItem;
  payload: {
    item: any;
    quantity: number;
  };
}

interface CartRemoveAction {
  type: typeof CartActions.Remove;
  payload: {
    itemId: number;
  };
}

type CartAction = CartSetItemAction | CartRemoveAction;

const reducer: Reducer<CartState, CartAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case CartActions.SetItem: {
      const { item, quantity } = action.payload;
      let items = { ...state.items };

      if (items[item.id]) {
        if (items[item.id].quantity + quantity > item.quantity) {
          return state;
        }
        items[item.id].quantity = items[item.id].quantity + quantity;
      } else {
        if (quantity > item.quantity) {
          return state;
        }

        items[item.id] = {
          item,
          quantity,
        };
      }

      return {
        items,
        total: calcTotal(items),
      };
    }

    case CartActions.Remove: {
      const { itemId } = action.payload;
      let items = { ...state.items };

      if (items[itemId]) {
        delete items[itemId];
      }

      return {
        total: calcTotal(items),
        items: { ...items },
      };
    }
    default:
      return state;
  }
};

const calcTotal = (items: CartItems): number => {
  const itemsIds = Object.keys(items);
  if (!itemsIds.length) {
    return 0;
  }
  let total = itemsIds.reduce<number>((total, itemId) => {
    return (total += items[itemId].quantity * items[itemId].item.price);
  }, 0);
  return +total.toFixed(2);
};

//============== SELECTORS ================

const getLocalState = (state: RootState) => state.cart;
const getTotal = (state: RootState) => getLocalState(state).total;
const getItems = (state: RootState) => getLocalState(state).items;

//============== ACTIONS ================
export type ThunkResult<R> = ThunkAction<R, RootState, void, CartAction>;

const deleteItem = (itemId: number): ThunkResult<void> => (dispatch) => {
  dispatch({
    type: CartActions.Remove,
    payload: {
      itemId,
    },
  });
};

const setItem = (item: Goods, quantity: number): ThunkResult<void> => (
  dispatch
) => {
  if (quantity === 0) {
    dispatch({
      type: CartActions.Remove,
      payload: {
        itemId: item.id,
      },
    });
  } else {
    dispatch({
      type: CartActions.SetItem,
      payload: {
        item,
        quantity,
      },
    });
  }
};

export default {
  reducer,
  actions: {
    setItem,
    deleteItem,
  },
  selectors: {
    getTotal,
    getItems,
  },
};
