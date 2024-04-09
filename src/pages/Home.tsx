import { MouseEvent, useEffect, useState } from "react"
import { Product } from "../utils/productType"
import ProductsTable from "../components/ProductsTable"
import ErrorMessage from "../components/ErrorMessage"
import ProductDetails from "../components/ProductDetails"
import { useNavigate, useLocation } from 'react-router-dom';
import { SelectedProductProvider } from '../context/SelectedProductContext';
import { ErrorType } from "../utils/ErrorType"
import Header from "../components/Header"
import ProductFilter from "../components/ProductFilter"
import { fetchProductById } from "../utils/fetchProductById"
import { fetchProductsByPage } from "../utils/fetchProductsByPage"

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams =  new URLSearchParams(location.search)
    const pageParam: string = searchParams.get('page') || ''
    const idParam: string = searchParams.get('id') || ''

    const productId: number = (parseInt(idParam) || 0)
    const [page, setPage] = useState<number>(parseInt(pageParam)-1 || 0)

    const [productsList, setProductsList] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<ErrorType | null>(null)

    const handleChangePage = (_e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage)
        
        productId
        ? navigate (`?page=${newPage+1}&id=${productId}`)
        : navigate (`?page=${newPage+1}`)
    }

    useEffect(() => {
        productId
        ? fetchProductById(productId, setProductsList, setError, setLoading)
        : fetchProductsByPage(page, setProductsList, setError, setLoading)
    },[page, productId])

  return (
    <>
        <Header/>
        <ProductFilter 
            productId={productId} 
            page={page}
            setLoading={setLoading}
            setProductsList={setProductsList}
            setError={setError}/>
        
        {!error &&  productsList &&
        <>
            <SelectedProductProvider>
                <ProductsTable 
                    productsList={productsList} 
                    page={page} 
                    handleChangePage={handleChangePage}
                    loading={loading}/>

                <ProductDetails />
            </SelectedProductProvider>
        </>
        }

        {error && <ErrorMessage code={error.code} message={error.message}/>}
    </>
  )
}

export default Home