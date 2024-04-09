import { lazy, useEffect, useState, Suspense } from "react"
import ProductsTable from "../components/ProductsTable"
import ProductDetails from "../components/ProductDetails"
import {  useLocation } from 'react-router-dom';
import { SelectedProductProvider } from '../context/SelectedProductContext';
import Header from "../components/Header"
import ProductFilter from "../components/ProductFilter"
import { fetchProductById } from "../utils/fetchProductById"
import { fetchProductsByPage } from "../utils/fetchProductsByPage"
import Loading from "../components/Loading";
import { useProductsContext } from "../context/ProductsContext";

const ErrorMessage = lazy(() => import('../components/ErrorMessage'))

const Home = () => {
    const location = useLocation();
    const searchParams =  new URLSearchParams(location.search)
    const pageParam: string = searchParams.get('page') || ''
    const idParam: string = searchParams.get('id') || ''

    const productId: number = (parseInt(idParam) || 0)
    const [page, setPage] = useState<number>(parseInt(pageParam)-1 || 0)

    const { setLoading, productsList, setProductsList, error, setError} = useProductsContext()

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
            page={page}/>

        {!error &&  productsList &&
        <>
            <SelectedProductProvider>
                <ProductsTable 
                    productId={productId} 
                    page={page} 
                    setPage={setPage}/>

                <ProductDetails />
            </SelectedProductProvider>
        </>
        }

        {error && 
            <Suspense fallback={<Loading/>}>
                <ErrorMessage code={error.code} message={error.message}/>
            </Suspense>
        }
    </>
  )
}

export default Home