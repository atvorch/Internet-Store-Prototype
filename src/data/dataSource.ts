import { DirtyGoodsData } from "./types";

const GOODS_DB_FILE_PATH = "data.json";
const GOODS_NAMES_FILE_PATH = "names.json";

export const readFromFile = (filePath: string): Promise<any> => {
  return fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => console.error(error));
};

export const loadGoods = (): Promise<DirtyGoodsData> =>
  readFromFile(GOODS_DB_FILE_PATH);

export const loadGoodsNames = (): any => readFromFile(GOODS_NAMES_FILE_PATH);

export default {
  readFromFile,
  loadGoods,
  loadGoodsNames,
};
