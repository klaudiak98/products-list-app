import { Product } from "./productType";
import { ErrorType } from "./ErrorType";

export type ProductsContextType = {
  productsList: Product[];
  setProductsList: (products: Product[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: ErrorType | null;
  setError: (error: ErrorType | null) => void;
};
