import { createContext, useContext, useState } from "react";
import { Product } from "../utils/productType";

const SelectedProductContext = createContext();

export const useSelectedProductContext = () => useContext(SelectedProductContext);

const NO_PRODUCT: Product = {
    id: 0,
    name: '',
    year: 0,
    color: '',
    pantone_value: ''
}

export const SelectedProductProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product>(NO_PRODUCT)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleClose = () => {
        setOpenModal(false)
    }

    const contextValues = {
        selectedProduct,
        openModal,
        setSelectedProduct,
        setOpenModal,
        handleClose
    };

    return (
        <SelectedProductContext.Provider value={contextValues}>
            {children}
        </SelectedProductContext.Provider>
    );
}