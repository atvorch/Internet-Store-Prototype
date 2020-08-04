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
  AddItem: "cardModule/addItem",
  SetItemQuantity: "cardModule/setItemQuantity",
  DeleteItem: "cardModule/deleteItem",
} as const;

interface AddItem {
  type: typeof CartActions.AddItem;
  payload: {
    item: Goods;
    quantity: number;
  };
}

interface CartSetItemQuantityAction {
  type: typeof CartActions.SetItemQuantity;
  payload: {
    itemId: number;
    quantity: number;
  };
}

interface CartDeleteItemAction {
  type: typeof CartActions.DeleteItem;
  payload: {
    itemId: number;
  };
}

type CartAction = CartSetItemQuantityAction | CartDeleteItemAction | AddItem;

const reducer: Reducer<CartState, CartAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case CartActions.AddItem: {
      const { item, quantity } = action.payload;
      const items = { ...state.items };
      const cartItem = items[item.id];

      if (
        quantity < 0 ||
        quantity > item.quantity ||
        (cartItem && cartItem.quantity + quantity > item.quantity)
      ) {
        return state;
      }

      let totalQuantity = cartItem ? cartItem.quantity + quantity : quantity;

      return {
        items: {
          ...items,
          [item.id]: {
            item,
            quantity: totalQuantity,
          },
        },
        total: calcTotal(items),
      };
    }

    case CartActions.SetItemQuantity: {
      const { itemId, quantity } = action.payload;
      let items = { ...state.items };
      const cartItem = items[itemId];

      if (!cartItem || quantity > cartItem.item.quantity || quantity < 0) {
        return state;
      }

      return {
        items: {
          ...items,
          [itemId]: {
            ...cartItem,
            quantity,
          },
        },
        total: calcTotal(items),
      };
    }

    case CartActions.DeleteItem: {
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
    type: CartActions.DeleteItem,
    payload: {
      itemId,
    },
  });
};

const setItemQuantity = (
  itemId: number,
  quantity: number
): ThunkResult<void> => (dispatch) => {
  if (quantity === 0) {
    dispatch({
      type: CartActions.DeleteItem,
      payload: {
        itemId,
      },
    });
  } else {
    dispatch({
      type: CartActions.SetItemQuantity,
      payload: {
        itemId,
        quantity,
      },
    });
  }
};

const addItem = (item: Goods, quantity: number): ThunkResult<void> => (
  dispatch
) => {
  dispatch({
    type: CartActions.AddItem,
    payload: {
      item,
      quantity,
    },
  });
};

export default {
  reducer,
  actions: {
    addItem,
    setItemQuantity,
    deleteItem,
  },
  selectors: {
    getTotal,
    getItems,
  },
};
