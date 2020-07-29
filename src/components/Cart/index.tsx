import React from "react";
import * as Styled from "./styled";
import { RootState } from "modules";
import { connect } from "react-redux";
import cartModule, { CartItems } from "modules/cart";
import CartItem from "./CartItem";
import generalModule from "modules/general";

interface StateProps {
  total: number;
  items: CartItems;
  currencyRate: number;
}
interface DispatchProps {
  deleteItem: any;
  changeQuantity: any;
}
export const Cart: React.FC<StateProps & DispatchProps> = ({
  items,
  total,
  deleteItem,
  currencyRate,
  changeQuantity,
}) => {
  const renderCart = React.useMemo(() => {
    if (!items || Object.keys(items).length < 1) {
      return <Styled.EmptyMessage>Корзина пуста</Styled.EmptyMessage>;
    }
    return (
      <Styled.Wrapper>
        {Object.keys(items).map((itemId) => {
          return (
            <CartItem
              key={itemId}
              item={items[itemId]}
              onDelete={() => deleteItem(itemId)}
              onChangeQuantity={changeQuantity}
            />
          );
        })}
      </Styled.Wrapper>
    );
  }, [items]);
  return (
    <Styled.Cart>
      <Styled.Header>
        <Styled.Title>Корзина</Styled.Title>
        <Styled.CurrencyRate>
          Курс валюты: 1$ = {currencyRate}&nbsp; руб.,
        </Styled.CurrencyRate>
      </Styled.Header>
      {renderCart}
      {total > 0 && (
        <Styled.Total>
          <Styled.TotalTitle>Общая стоимость:</Styled.TotalTitle>
          <Styled.TotalValue>
            {(total * currencyRate).toFixed(2)} руб.
          </Styled.TotalValue>
        </Styled.Total>
      )}
    </Styled.Cart>
  );
};

const connectEnhancer = connect<StateProps, DispatchProps, {}, RootState>(
  (state) => ({
    total: cartModule.selectors.getTotal(state),
    items: cartModule.selectors.getItems(state),
    currencyRate: generalModule.selectors.getCurrencyRate(state),
  }),
  {
    deleteItem: cartModule.actions.deleteItem,
    changeQuantity: cartModule.actions.setItem,
  }
);

export default connectEnhancer(Cart);
