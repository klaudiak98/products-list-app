import { Modal, Box, Typography } from "@mui/material"
import { Product } from "../types/productType";
import { FC } from "react";

type ProductDetailsProps = {
    openModal: (e:unknown) => void;
    handleClose: (e:unknown) => void;
    selectedProduct: Product
}

const ProductDetails: FC<ProductDetailsProps> = ({openModal, handleClose, selectedProduct}) => {
  return (
    <Modal 
      open={openModal} 
      onClose={handleClose} 
      sx={{display: 'flex', p: 1, alignItems: 'center', justifyContent: 'center', outline: 'none'}}>
        <Box 
          sx={{
            height: 300, 
            width: 300, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            borderRadius: 1
          }} 
          bgcolor={selectedProduct.color}>
            <Typography variant="h3">{selectedProduct.name}</Typography>
            <Typography variant="h4">{selectedProduct.year}</Typography>
            <Typography variant="h4">{selectedProduct.color}</Typography>
            <Typography variant="h4">{selectedProduct.pantone_value}</Typography>
        </Box>
    </Modal>
  )
}

export default ProductDetails