import { Product } from "./ProductType";
import { ErrorType } from "./ErrorType";

export type ProductsContext = {
  productsList: Product[];
  setProductsList: (products: Product[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: ErrorType | null;
  setError: (error: ErrorType | null) => void;
};
