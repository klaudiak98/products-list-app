import { TextField, Typography } from "@mui/material"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { Product } from "../utils/productType"
import ProductsTable from "../components/ProductsTable"
import ErrorMessage from "../components/ErrorMessage"
import ProductDetails from "../components/ProductDetails"
import { useNavigate, useLocation } from 'react-router-dom';

const ROWS_PER_PAGE: number = 5
const TOTAL_PRODUCTS: number = 12

const NO_PRODUCT: Product = {
    id: 0,
    name: '',
    year: 0,
    color: '',
    pantone_value: ''
}

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
    const [selectedProduct, setSelectedProduct] = useState<Product>(NO_PRODUCT)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleChooseID = (e: ChangeEvent<HTMLInputElement>) => {
        const prodID = Number(e.target.value)
        setProductID(prodID)

        prodID
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
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError = error;
                if (axiosError.response?.status === 404) {
                    setError({ code: axiosError.response?.status, message: axiosError.response.data.message || 'Not Found. Please change your parameters.' })
                } else {
                    setError({ code: axiosError.response?.status, message: axiosError.response.data.message || axiosError.message })
                }
            } else {
                setError({code: 500, message: 'Unknown error'})
            }
            throw error;
        }
        setLoading(false)
    }

    const handleChangePage = (_e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
        <Typography variant='h1' color='primary.main' pt='1em'>Products List</Typography>
        <TextField 
            type='number' 
            label='Choose ID' 
            value={productID || ''} 
            onChange={handleChooseID} 
            inputProps={{min: 1}}/>
        
        {!error &&  productsList &&
        <>
            <ProductsTable 
                productsList={productsList} 
                rowsPerPage={ROWS_PER_PAGE} 
                totalProducts={TOTAL_PRODUCTS} 
                page={page} 
                handleChangePage={handleChangePage}
                selectProduct={setSelectedProduct}
                showProduct={setOpenModal} 
                loading={loading}/>

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