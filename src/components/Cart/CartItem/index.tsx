import * as React from "react";
import { connect } from "react-redux";
import { CartItem as ICartItem } from "modules/cart";
import generalModule from "modules/general";
import * as Styled from "./styled";
import { Goods } from "data/types";

interface OwnProps {
  item: ICartItem;
  onDelete: () => void;
  onChangeQuantity: (item: Goods, quantity: number) => void;
}

interface StateProps {
  currencyRate: number;
}

const QUANTITY_WARNING = 5;

export const CartItem: React.FC<OwnProps & StateProps> = ({
  item,
  onDelete,
  currencyRate,
  onChangeQuantity,
}) => {
  const [quantity, setQuantity] = React.useState(item.quantity);

  React.useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
    onChangeQuantity(item.item, parseInt(e.target.value));
  };

  const totalPrice = React.useMemo(() => {
    const price = item.item.price * currencyRate * item.quantity;
    return price.toFixed(2);
  }, [item.item.price, currencyRate, item.quantity]);

  return (
    <Styled.CartItem>
      <Styled.Name>{item.item.name}</Styled.Name>
      <Styled.Quantity>
        <div>
          <Styled.QuantityInput
            type="number"
            min="0"
            max={item.item.quantity}
            onChange={handleChange}
            value={quantity}
          />
          шт. / {item.item.quantity} шт.
        </div>
        {item.item.quantity < QUANTITY_WARNING && (
          <Styled.QuantityWarning>Количество ограничено</Styled.QuantityWarning>
        )}
      </Styled.Quantity>

      <Styled.Price>{totalPrice}&nbsp;руб./шт.</Styled.Price>
      <Styled.Delete onClick={onDelete}>Удалить</Styled.Delete>
    </Styled.CartItem>
  );
};

const connectEnhancer = connect<StateProps, {}, OwnProps>((state) => ({
  currencyRate: generalModule.selectors.getCurrencyRate(state),
}));

export default connectEnhancer(CartItem);
