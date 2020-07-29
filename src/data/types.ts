export interface DirtyGoods {
  C: number;
  G: number;
  P: number;
  T: number;
}

export interface DirtyGoodsData {
  Value: {
    Goods: Array<DirtyGoods>;
  };
}

export interface GoodsNames {
  [key: string]: {
    G: string;
    B: {
      [key: number]: {
        N: string;
      };
    };
  };
}

export interface Goods {
  id: number;
  groupId: number;
  price: number;
  quantity: number;
  name: string;
}

export interface Group {
  name: string;
  goods: Array<Goods>;
}

export interface Groups {
  [groupId: string]: Group;
}
