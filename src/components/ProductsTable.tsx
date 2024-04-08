import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, CircularProgress, Box, alpha } from "@mui/material"
import { Product } from "../utils/productType"
import { ProductsTableProps } from "../utils/productsTablePropsType"
import { useSelectedProductContext } from '../context/SelectedProductContext';
import { SelectedProductContextType } from "../utils/selectedProductContextType";
import { ROWS_PER_PAGE, TOTAL_PRODUCTS } from "../data/tableData"

const ProductsTable = ({ productsList, page, handleChangePage, loading }: ProductsTableProps) => {

    const { setSelectedProduct, setOpenModal } = useSelectedProductContext() as SelectedProductContextType;

    const handleClick = (product: Product) => {
        setSelectedProduct(product)
        setOpenModal(true)
    }

  return (
    <TableContainer component={Paper} sx={{ '@media (max-width: 720px)' : { maxWidth: '80%'}}}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Year</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { loading && !productsList.length &&
                    <TableRow>
                        <TableCell colSpan={3}>
                            <Box sx={{height: 200, alignSelf:'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <CircularProgress size="70px"/>
                            </Box>
                        </TableCell>
                    </TableRow>
                }
                { productsList.map((product: Product) => (
                    <TableRow 
                        key={product.id} 
                        sx={{ 
                            bgcolor: product.color,
                            '&:hover': {
                                bgcolor: alpha(product.color, 0.8),
                                cursor: 'pointer'
                            }
                        }} 
                        onClick={() => handleClick(product)}>
                        <TableCell component="th" scope="row">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.year}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
           <TableFooter>
                <TableRow>
                    { productsList.length > 1 ? 
                        <TablePagination
                            rowsPerPageOptions={[ROWS_PER_PAGE]}
                            count={TOTAL_PRODUCTS}
                            rowsPerPage={ROWS_PER_PAGE}
                            page={page}
                            onPageChange={handleChangePage}
                            />
                        : 
                        <TablePagination
                            rowsPerPageOptions={[1]}
                            count={1}
                            rowsPerPage={1}
                            page={0}
                            onPageChange={handleChangePage}
                            />
                    }
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>
  )
}

export default ProductsTable