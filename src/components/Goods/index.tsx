import * as React from "react";
import * as Styled from "./styled";
import { connect } from "react-redux";
import { RootState } from "modules";
import { Groups } from "data/types";
import goodsModule from "modules/goods";
import Group from "./Group";

interface StateProps {
  groups: Groups;
}

export const Goods: React.FC<StateProps> = ({ groups }) => {
  const renderGoods = React.useMemo(() => {
    if (!groups) {
      return null;
    }
    return (
      <React.Fragment>
        <Styled.Title>Товары</Styled.Title>
        <Styled.Goods>
          {Object.keys(groups).map((item: string) => {
            return <Group key={groups[item].name} group={groups[item]}></Group>;
          })}
        </Styled.Goods>
      </React.Fragment>
    );
  }, [groups]);

  return renderGoods;
};

const connectEnhancer = connect<StateProps, {}, {}, RootState>((state) => ({
  groups: goodsModule.selectors.getGoods(state),
}));

export default connectEnhancer(Goods);
