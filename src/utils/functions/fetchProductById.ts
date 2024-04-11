import axios from "axios";
import { Product } from "../types/ProductType";

export const fetchProductById = (id: number): Promise<[Product]> =>
  axios
    .get(`https://reqres.in/api/products?id=${id}`)
    .then((res) => [res.data.data]);
