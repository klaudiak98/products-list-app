import { Product } from "./ProductType";

export type SelectedProductContext = {
  selectedProduct: Product;
  openModal: boolean;
  handleClose: () => void;
  setSelectedProduct: (e: Product) => void;
  setOpenModal: (e: boolean) => void;
};
