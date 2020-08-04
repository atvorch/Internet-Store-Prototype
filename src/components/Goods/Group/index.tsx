import * as React from "react";
import GroupItem from "./GroupItem";
import { Group as IGroup } from "data/types";
import { connect } from "react-redux";
import { RootState } from "modules";
import cartModule from "modules/cart";
import * as Styled from "./styled";

interface OwnProps {
  group: IGroup;
}

interface DispatchProps {
  addToCart: any;
}

export const Group: React.FC<OwnProps & DispatchProps> = ({
  group,
  addToCart,
}) => {
  const renderGoods = React.useMemo(() => {
    if (!group || !group.goods.length) {
      return null;
    }
    return (
      <Styled.GroupWrapper>
        <Styled.GroupHeader>{group.name}</Styled.GroupHeader>
        <Styled.GroupContent>
          {group.goods.map((item) => {
            return (
              <GroupItem
                key={item.name}
                item={item}
                onClick={() => addToCart(item, 1)}
              />
            );
          })}
        </Styled.GroupContent>
      </Styled.GroupWrapper>
    );
  }, [group, addToCart]);

  return renderGoods;
};

const connectEnhancer = connect<{}, DispatchProps, OwnProps, RootState>(null, {
  addToCart: cartModule.actions.addItem,
});

export default connectEnhancer(Group);
