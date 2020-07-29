import { RootState } from "modules";
import { Reducer } from "redux";
import { Goods } from "data/types";
import { ThunkAction } from "redux-thunk";

export interface GeneralState {
  currencyRate: number;
}

const defaultState: GeneralState = {
  currencyRate: 16,
};

const Actions = {
  setCurrencyRate: "generalModule/setCurrency",
} as const;

interface SetCurrencyRate {
  type: typeof Actions.setCurrencyRate;
  payload: {
    currencyRate: number;
  };
}

type Actions = SetCurrencyRate;
const reducer: Reducer<GeneralState, Actions> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case Actions.setCurrencyRate: {
      const { currencyRate } = action.payload;
      return {
        currencyRate,
      };
    }

    default:
      return state;
  }
};

//============== SELECTORS ================

const getLocalState = (state: RootState) => state.general;
const getCurrencyRate = (state: RootState) => getLocalState(state).currencyRate;

//============== ACTIONS ================
export type ThunkResult<R> = ThunkAction<R, RootState, void, Actions>;

const setCurrencyRate = (currencyRate: number): ThunkResult<void> => (
  dispatch
) => {
  dispatch({
    type: Actions.setCurrencyRate,
    payload: {
      currencyRate,
    },
  });
};

export default {
  reducer,
  actions: {
    setCurrencyRate,
  },
  selectors: {
    getCurrencyRate,
  },
};
