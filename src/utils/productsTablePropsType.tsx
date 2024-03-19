import { Product } from "./productType";
import { MouseEvent } from 'react'

export type ProductsTableProps = {
  productsList: Product[];
  rowsPerPage: number;
  totalProducts: number;
  page: number;
  handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  loading: boolean;
};
