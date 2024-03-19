import { Modal, Box, Typography, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useSelectedProductContext } from '../context/SelectedProductContext';
import { SelectedProductContextType } from "../utils/selectedProductContextType";

const ProductDetails = () => {
  const { selectedProduct, openModal, handleClose } = useSelectedProductContext() as SelectedProductContextType;

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
            borderRadius: 1,
            position: 'relative'
          }} 
          bgcolor={selectedProduct.color}>
            <IconButton sx={{ position: 'absolute', top: 5, right: 5 }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h3">{selectedProduct.name}</Typography>
            <Typography variant="h4">{selectedProduct.year}</Typography>
            <Typography variant="h4">{selectedProduct.color}</Typography>
            <Typography variant="h4">{selectedProduct.pantone_value}</Typography>
        </Box>
    </Modal>
  )
}

export default ProductDetails