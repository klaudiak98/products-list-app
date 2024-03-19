import { Product } from "./productType"

export type SelectedProductContextType = {
  selectedProduct: Product;
  openModal: boolean;
  handleClose: () => void;
  setSelectedProduct: (e: Product) => void ;
  setOpenModal: (e: boolean) => void;
}