import TextField from "@mui/material/TextField"
import { ChangeEvent } from "react"
import { Product } from "../utils/productType"
import { ErrorType } from "../utils/ErrorType"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { useState } from "react"
import { debounce } from "@mui/material"
import { fetchProductById } from "../utils/fetchProductById"
import { fetchProductsByPage } from "../utils/fetchProductsByPage"
import { useProductsContext } from "../context/ProductsContext"
import { ProductsContextType } from "../utils/ProductsContextType"

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

  const { setLoading, setProductsList, setError } = useProductsContext() as ProductsContextType
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