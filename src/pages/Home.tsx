import { TextField, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"

type Product = {
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: string
}

const ROWS_PER_PAGE: number = 5
const TOTAL_PRODUCTS: number = 12

const Home = () => {
    const [productID, setProductID] = useState<number>(0)
    const [productsList, setProductsList] = useState<Product[]>([])
    const [page, setPage] = useState<number>(0)
    
    const handleChooseID = (e: ChangeEvent<HTMLInputElement>) => {
        setProductID(e.target.value)
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://reqres.in/api/products?per_page=${ROWS_PER_PAGE}}&page=${page+1}`)
            setProductsList(response.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleChangePage = (_e: unknown, newPage: number) => {
        setPage(newPage)
    }

    useEffect(() => {
        fetchProducts()
    },[page])

  return (
    <>
        <Typography variant='h1' color='primary.main'>Products List</Typography>
        <TextField 
            type='number' 
            label='Choose ID' 
            value={productID} 
            onChange={handleChooseID} />
        
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
                            rowsPerPageOptions={[ROWS_PER_PAGE]}
                            count={TOTAL_PRODUCTS}
                            rowsPerPage={ROWS_PER_PAGE}
                            page={page}
                            onPageChange={handleChangePage}
                            />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </>
  )
}

export default Home