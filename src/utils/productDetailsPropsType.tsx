import { Product } from "./productType";

export type ProductDetailsProps = {
    openModal: boolean;
    handleClose: (e: boolean) => void;
    selectedProduct: Product
}