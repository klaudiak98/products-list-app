import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@mui/material"
import { Product } from "../types/productType"
import React from "react";

type ProductsTableProps = {
    productsList: Product[];
    rowsPerPage: number;
    totalProducts: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({productsList, rowsPerPage, totalProducts, page, handleChangePage}) => {
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
                {productsList.map((product: Product) => (
                    <TableRow key={product.id} sx={{ bgcolor: product.color }}>
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