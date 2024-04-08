import { Product } from "./productType";
import { MouseEvent } from 'react'

export type ProductsTableProps = {
  productsList: Product[];
  page: number;
  handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  loading: boolean;
};
