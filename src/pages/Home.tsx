import { lazy, useState, Suspense } from "react"
import { useLocation } from 'react-router-dom';
import ProductsTable from "../components/ProductsTable"
import ProductDetails from "../components/ProductDetails"
import Header from "../components/Header"
import { Product } from "../utils/types/ProductType"
import ProductFilter from "../components/ProductFilter"
import Loading from "../components/Loading";
import { SelectedProductProvider } from '../context/SelectedProductContext';
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { fetchProductsByPage } from "../utils/functions/fetchProductsByPage";
import { fetchProductById } from "../utils/functions/fetchProductById";

const ErrorMessage = lazy(() => import('../components/ErrorMessage'))

const Home = () => {
    const location = useLocation();
    const searchParams =  new URLSearchParams(location.search)
    const pageParam: string = searchParams.get('page') || ''
    const idParam: string = searchParams.get('id') || ''

    const productId: number = (parseInt(idParam) || 0)
    const [page, setPage] = useState<number>(parseInt(pageParam)-1 || 0)

    const { isLoading: productsLoading, error: productsError, data: products } = useQuery<Product[], AxiosError>({
        queryKey: ['products', {page: page+1}],
        queryFn: () => fetchProductsByPage(page+1),
        retry: false,
    })

    const { isLoading: productLoading, error: productError, data: product } = useQuery<[Product], AxiosError>({
        queryKey: ['product', {id: productId}],
        queryFn: () => fetchProductById(productId),
        enabled: !!productId,
        retry: false
    })

    const displayedProducts: Product[] | null = product ? product : (products || null)
    const error: AxiosError | null = productsError || productError
    const loading: boolean = productsLoading || productLoading

    return (
    <>
        <Header/>
        <ProductFilter 
            productId={productId} 
            page={page}/>
   

       { !error && 
        <>
            <SelectedProductProvider>
                <ProductsTable 
                    productId={productId} 
                    page={page} 
                    setPage={setPage}
                    products={displayedProducts}
                    loading={loading}
                />
                <ProductDetails />
            </SelectedProductProvider>
        </>
        }

        { error &&
            <Suspense fallback={<Loading/>}>
                <ErrorMessage code={error.response?.status} message={error.message}/>
            </Suspense>
        }
    </>
  )
}

export default Home