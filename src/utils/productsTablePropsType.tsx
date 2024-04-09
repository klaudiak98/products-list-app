import { MouseEvent } from 'react'

export type ProductsTableProps = {
  page: number;
  handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
};
