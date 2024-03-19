import { TextField, Typography, Box, CircularProgress } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import { Product } from "../types/productType"
import ProductsTable from "../components/ProductsTable"
import ErrorMessage from "../components/ErrorMessage"
import ProductDetails from "../components/ProductDetails"
import { useNavigate, useLocation } from 'react-router-dom';

const ROWS_PER_PAGE: number = 5
const TOTAL_PRODUCTS: number = 12

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams =  new URLSearchParams(location.search)
    const pageParam: string = searchParams.get('page') || ''
    const idParam: string = searchParams.get('id') || ''

    const [productID, setProductID] = useState<number>(parseInt(idParam) || 0)
    const [productsList, setProductsList] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(parseInt(pageParam)-1 || 0)
    const [error, setError] = useState<{code: number, message: string} | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<Product>({})
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleChooseID = (e: ChangeEvent<HTMLInputElement>) => {
        const prodID = e.target.value
        setProductID(prodID)

        prodID.length
        ? navigate(`?page=${page+1}&id=${prodID}`)
        : navigate(`?page=${page+1}`)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const fetchProducts = async () => {
        try {
            if (productID) {
                const response = await axios.get(`https://reqres.in/api/products?id=${productID}`)
                setProductsList([response.data.data])
            } else {
                const response = await axios.get(`https://reqres.in/api/products?per_page=${ROWS_PER_PAGE}}&page=${page+1}`)
                setProductsList(response.data.data)
            }
            setError(null)
        } catch (err) {
            if (err.respons?.data.massage) {
                setError({code: err.response.status, message: err.response.data.message})
            } else if (err.response.status === 404) {
                setError({code: err.response.status, message: 'Product not found. Please change parameters.'})
            } else {
                setError({code: err.response.status, message: 'Try again later'})
            }
        }
        setLoading(false)
    }

    const handleChangePage = (_e: unknown, newPage: number) => {
        setPage(newPage)
        
        productID
        ? navigate (`?page=${newPage+1}&id=${productID}`)
        : navigate (`?page=${newPage+1}`)
    }

    useEffect(() => {
        setLoading(true)
        fetchProducts()
    },[page, productID])

  return (
    <>
        <Typography variant='h1' color='primary.main'>Products List</Typography>
        <TextField 
            type='number' 
            label='Choose ID' 
            value={productID} 
            onChange={handleChooseID} />
        
        {loading &&
            <Box sx={{width: '100vw', height: 300, alignSelf:'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress size="70px"/>
            </Box>
        }

        {!error && !loading && productsList &&
        <>
            <ProductsTable 
                productsList={productsList} 
                rowsPerPage={ROWS_PER_PAGE} 
                totalProducts={TOTAL_PRODUCTS} 
                page={page} 
                handleChangePage={handleChangePage}
                selectProduct={setSelectedProduct}
                showProduct={setOpenModal} />

            <ProductDetails 
                openModal={openModal} 
                handleClose={handleClose} 
                selectedProduct={selectedProduct} />
        </>
        }

        {error && <ErrorMessage code={error.code} message={error.message}/>}
    </>
  )
}

export default Home