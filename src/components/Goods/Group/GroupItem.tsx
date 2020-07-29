import * as React from "react";
import { connect } from "react-redux";
import { Goods } from "data/types";
import generalModule from "modules/general";
import * as Styled from "./styled";

interface StateProps {
  currencyRate: number;
}

interface OwnProps {
  item: Goods;
  onClick: () => void;
}

export const GroupItem: React.FC<StateProps & OwnProps> = ({
  item,
  currencyRate,
  onClick,
}) => {
  const [price, setPrice] = React.useState(
    Number((item.price * currencyRate).toFixed(2))
  );
  const [isHigher, setIsHigher] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const newPrice = Number((item.price * currencyRate).toFixed(2));
    if (newPrice > price) {
      setIsHigher(true);
    } else if (newPrice < price) {
      setIsHigher(false);
    } else {
      setIsHigher(null);
    }
    setPrice(newPrice);
  }, [item.price, currencyRate]);

  return (
    <Styled.GroupItem onClick={onClick}>
      <Styled.Name isHigher={isHigher}>
        {item.name}&nbsp;({item.quantity})
      </Styled.Name>
      <Styled.Price>{price}</Styled.Price>
    </Styled.GroupItem>
  );
};

const connectEnhancer = connect<StateProps, {}, OwnProps>((state) => ({
  currencyRate: generalModule.selectors.getCurrencyRate(state),
}));

export default connectEnhancer(GroupItem);
