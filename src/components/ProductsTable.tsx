import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, alpha } from "@mui/material"
import { Product } from "../utils/types/ProductType"
import { useSelectedProductContext } from '../context/SelectedProductContext';
import { SelectedProductContext } from "../utils/types/SelectedProductContextType";
import { ROWS_PER_PAGE, TOTAL_PRODUCTS } from "../data/tableData"
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

const ProductsTable = ({ productId, page, setPage, products, loading } : {
    productId: number,
    page: number,
    setPage: (page: number) => void,
    products: Product[] | null,
    loading: boolean
}) => {

    const navigate = useNavigate()

    const { setSelectedProduct, setOpenModal } = useSelectedProductContext() as SelectedProductContext;

    const handleClick = (product: Product) => {
        setSelectedProduct(product)
        setOpenModal(true)
    }

    const handleChangePage = (_e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage)
        
        productId
        ? navigate (`?page=${newPage+1}&id=${productId}`)
        : navigate (`?page=${newPage+1}`)
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
                { loading &&
                    <TableRow>
                        <TableCell colSpan={3}>
                            <Loading/>
                        </TableCell>
                    </TableRow>
                }
                { !loading && products && products.length === 0 &&
                    <TableRow>
                        <TableCell colSpan={3} sx={{textAlign: 'center'}}><strong>No data. Please change parameters.</strong></TableCell>
                    </TableRow>
                }
                { !loading && products && products.length > 0 && products.map((product: Product) => (
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
                    { products && !productId ? 
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