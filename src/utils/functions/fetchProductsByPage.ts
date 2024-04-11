import axios from "axios";
import { ROWS_PER_PAGE } from "../../data/tableData";
import { Product } from "../types/ProductType";

export const fetchProductsByPage = (page: number): Promise<Product[]> =>
  axios
    .get(
      `https://reqres.in/api/products?per_page=${ROWS_PER_PAGE}&page=${page}`
    )
    .then((res) => res.data.data);
