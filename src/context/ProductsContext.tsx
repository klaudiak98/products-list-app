import { ReactNode, createContext, useContext, useState } from "react";
import { Product } from "../utils/types/ProductType";
import { ErrorType } from "../utils/types/ErrorType";
import { ProductsContext as ProductsContextType } from "../utils/types/ProductsContextType";

const ProductsContext = createContext<ProductsContextType>({
    productsList: [],
    setProductsList: () => {},
    loading: false,
    setLoading: () => {},
    error: null,
    setError: () => {},
})

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const [productsList, setProductsList] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<ErrorType | null>(null)

    const contextValues = {
        productsList,
        setProductsList,
        loading,
        setLoading,
        error,
        setError
    };

    return (
        <ProductsContext.Provider value={contextValues}>
            {children}
        </ProductsContext.Provider>
    );
}