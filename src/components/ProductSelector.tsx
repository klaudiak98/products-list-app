import TextField from "@mui/material/TextField"
import { ChangeEvent } from "react"

const ProductSelector = ({ productId, handleChooseId }: {productId: number, handleChooseId: (e: ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <TextField 
        type='number' 
        label='Choose ID' 
        value={productId || ''} 
        onChange={handleChooseId} 
        inputProps={{min: 1}}/>
  )
}

export default ProductSelector