import TextField from "@mui/material/TextField"
import { ChangeEvent, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { debounce } from "@mui/material"

const handleFetchProduct = async (
  productId: number, 
  page: number, 
  navigate: NavigateFunction
) => {
  productId
  ? navigate (`?page=${page+1}&id=${productId}`)
  : navigate (`?page=${page+1}`)
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

  const [selectedProduct, setSelectedProduct] = useState<number>(productId)

  const handleChooseId = (choosenId: number) => {
    setSelectedProduct(choosenId)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSelectedId: number = Number(e.target.value)
    handleChooseId(newSelectedId)
    debounceFetchingProduct(newSelectedId, page, navigate)
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