import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../utils/types/ProductType";
import { SelectedProductContext as SelectedProductContextType } from "../utils/types/SelectedProductContextType";

const NO_PRODUCT: Product = {
    id: 0,
    name: '',
    year: 0,
    color: '',
    pantone_value: ''
}

const SelectedProductContext = createContext<SelectedProductContextType>({
    selectedProduct: NO_PRODUCT,
    openModal: false,
    setSelectedProduct: () => {},
    setOpenModal: () => {},
    handleClose: () => {}
});

export const useSelectedProductContext = () => useContext(SelectedProductContext);

export const SelectedProductProvider = ({ children }: { children: ReactNode }) => {
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