import { TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import { Product } from "../types/productType"
import ProductsTable from "../components/ProductsTable"

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
        
        <ProductsTable 
            productsList={productsList} 
            rowsPerPage={ROWS_PER_PAGE} 
            totalProducts={TOTAL_PRODUCTS} 
            page={page} 
            handleChangePage={handleChangePage} />
    </>
  )
}

export default Home