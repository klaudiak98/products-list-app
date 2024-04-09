import TextField from "@mui/material/TextField"
import { ChangeEvent, useState } from "react"
import { Product } from "../utils/types/ProductType"
import { ErrorType } from "../utils/types/ErrorType"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { debounce } from "@mui/material"
import { fetchProductById } from "../utils/functions/fetchProductById"
import { fetchProductsByPage } from "../utils/functions/fetchProductsByPage"
import { useProductsContext } from "../context/ProductsContext"
import { ProductsContext } from "../utils/types/ProductsContextType"

const handleFetchProduct = async (
  setLoading: (loading: boolean) => void,
  setProductsList: (products: Product[]) => void,
  setError: (error: ErrorType | null) => void, 
  productId: number, 
  page: number, 
  navigate: NavigateFunction
  ) => {
  if (productId) {
    await fetchProductById(productId, setProductsList, setError, setLoading)
    navigate (`?page=${page+1}&id=${productId}`)
  } else {
    await fetchProductsByPage(page, setProductsList, setError, setLoading)
    navigate (`?page=${page+1}`)
  }
}

const debounceFetchingProduct = debounce(handleFetchProduct, 500)

const ProductFilter = ({ 
  productId, 
  page
}: {
  productId: number, 
  page: number
}) => {

  const navigate = useNavigate();

  const { setLoading, setProductsList, setError } = useProductsContext() as ProductsContext;
  const [selectedProduct, setSelectedProduct] = useState<number>(productId)

  const handleChooseId = (choosenId: number) => {
    setSelectedProduct(choosenId)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(e.target.value)
    handleChooseId(value)
    debounceFetchingProduct(setLoading, setProductsList, setError, value, page, navigate)
  }

  return (
    <TextField 
        type='number' 
        label='Choose ID' 
        value={selectedProduct || ''} 
        onChange={handleOnChange} 
        inputProps={{min: 1}}/>
  )
}

export default ProductFilter