import { RootState } from "modules";
import { Reducer } from "redux";
import { DirtyGoodsData, Groups, Goods, GoodsNames } from "data/types";
import { mapGoodsAndNames, parseGoodsJson } from "utils/goodsUtils";
import { ThunkAction } from "redux-thunk";
import dataSource from "data/dataSource";

interface GoodsState {
  goods: Groups | null;
  goodsNames: GoodsNames | null;
}

const defaultState: GoodsState = {
  goods: null,
  goodsNames: null,
};

const GoodsActions = {
  setGoods: "goodsModule/setGoods",
  setGoodsNames: "goodsModule/setGoodsNames",
} as const;

interface SetGoodsAction {
  type: typeof GoodsActions.setGoods;
  payload: {
    goods: DirtyGoodsData;
  };
}

interface SetGoodsNamesAction {
  type: typeof GoodsActions.setGoodsNames;
  payload: {
    goodsNames: GoodsNames;
  };
}

type GoodsAction = SetGoodsAction | SetGoodsNamesAction;

const reducer: Reducer<GoodsState, GoodsAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case GoodsActions.setGoods: {
      let goods: any = parseGoodsJson(action.payload.goods);
      if (state.goodsNames) {
        goods = mapGoodsAndNames(goods, state.goodsNames);
      }

      return {
        ...state,
        goods,
      };
    }
    case GoodsActions.setGoodsNames: {
      const { goodsNames } = action.payload;
      let goods = state.goods;

      return {
        goods,
        goodsNames,
      };
    }
    default:
      return state;
  }
};

//============== SELECTORS ================

const getLocalState = (state: RootState) => state.goods;
const getGoods = (state: RootState) => getLocalState(state).goods;

//============== ACTIONS ================
export type ThunkResult<R> = ThunkAction<R, RootState, void, GoodsAction>;

export const setGoods = (goods: DirtyGoodsData): ThunkResult<void> => (
  dispatch
) => {
  dispatch({
    type: GoodsActions.setGoods,
    payload: {
      goods,
    },
  });
};

export const setGoodsNames = (goodsNames: any): ThunkResult<void> => (
  dispatch
) => {
  dispatch({
    type: GoodsActions.setGoodsNames,
    payload: {
      goodsNames,
    },
  });
};

export const loadGoods = (): ThunkResult<Promise<void>> => (dispatch) => {
  return dataSource.loadGoods().then(
    (goods: any) => {
      dispatch(setGoods(goods));
    },
    (error: any) => {
      console.error(error);
    }
  );
};

export const loadNames = (): ThunkResult<Promise<void>> => (dispatch) => {
  return dataSource.loadGoodsNames().then(
    (goodsNames: any) => {
      dispatch(setGoodsNames(goodsNames));
    },
    (error: any) => {
      console.error(error);
    }
  );
};

export default {
  reducer,
  actions: {
    setGoods,
    setGoodsNames,
    loadGoods,
    loadNames,
  },
  selectors: {
    getGoods,
  },
};
