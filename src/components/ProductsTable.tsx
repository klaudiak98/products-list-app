import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, CircularProgress, Box } from "@mui/material"
import { Product } from "../types/productType"
import { FC } from "react";

type ProductsTableProps = {
    productsList: Product[];
    rowsPerPage: number;
    totalProducts: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    selectProduct: (e: unknown) => void;
    showProduct: (e:unknown) => void;
    loading: boolean
}

const ProductsTable: FC<ProductsTableProps> = ({productsList, rowsPerPage, totalProducts, page, handleChangePage, selectProduct, showProduct, loading}) => {

    const handleClick = (product: Product) => {
        selectProduct(product)
        showProduct(true)
    }

  return (
    <TableContainer component={Paper}>
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
                    <TableRow key={product.id} sx={{ bgcolor: product.color }} onClick={() => handleClick(product)}>
                        <TableCell component="th" scope="row">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.year}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[rowsPerPage]}
                        count={totalProducts}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>
  )
}

export default ProductsTable