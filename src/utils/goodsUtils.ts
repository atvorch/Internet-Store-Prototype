import { Goods, Groups, DirtyGoodsData, GoodsNames } from "data/types";

export const parseGoodsJson = (goodsData: DirtyGoodsData): Array<Goods> => {
  if (!goodsData || !goodsData.Value || !goodsData.Value.Goods) {
    console.log("No goods found");
    return [];
  }

  return goodsData.Value.Goods.map((item) => {
    return {
      id: item.T,
      groupId: item.G,
      price: item.C,
      quantity: item.P,
      name: "",
    };
  });
};

export const mapGoodsAndNames = (
  goods: Array<Goods>,
  goodsNamesData: GoodsNames
): Groups => {
  let groups: any = {};
  for (let item of goods) {
    item = { ...item, name: goodsNamesData[item.groupId]["B"][item.id]["N"] };
    if (!groups[`${item.groupId}`]) {
      groups[item.groupId] = {
        name: goodsNamesData[item.groupId].G,
        goods: [item],
      };
    } else {
      groups[item.groupId].goods.push(item);
    }
  }

  return groups;
};
