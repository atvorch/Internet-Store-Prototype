import React from "react";
import styled from "styled-components";
import Goods from "components/Goods";
import Cart from "components/Cart";
import { RootState } from "modules";
import { connect } from "react-redux";
import goodsModule from "modules/goods";
import generalModule from "modules/general";

interface DispatchProps {
  loadGoodsNames: any;
  loadGoods: any;
  setCurrencyRate: any;
}

const UPDATE_FREQUENCY = 3000; // Goods data and currency rate update frequency

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: 0 auto;
`;

export const Main: React.FC<DispatchProps> = ({
  loadGoods,
  loadGoodsNames,
  setCurrencyRate,
}) => {
  React.useEffect(() => {
    let intervalID: any = null;

    loadGoodsNames().then(() => {
      loadGoods();
      intervalID = setInterval(() => {
        loadGoods();
        let newRate = Math.random() * (80 - 20) + 20;
        setCurrencyRate(Number(newRate.toFixed(2)));
      }, UPDATE_FREQUENCY);
    });
    return () => clearInterval(intervalID);
  }, [loadGoods, loadGoodsNames]);

  return (
    <Wrapper>
      <Goods />
      <Cart />
    </Wrapper>
  );
};

const connectEnhancer = connect<{}, DispatchProps, {}, RootState>(null, {
  loadGoodsNames: goodsModule.actions.loadNames,
  loadGoods: goodsModule.actions.loadGoods,
  setCurrencyRate: generalModule.actions.setCurrencyRate,
});

export default connectEnhancer(Main);
