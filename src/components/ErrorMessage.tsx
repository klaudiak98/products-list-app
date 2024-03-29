import { FC } from "react"
import { Box, Typography } from "@mui/material"
import { ErrorMessageProps } from "../utils/errorMessagePropsType"

const ErrorMessage: FC<ErrorMessageProps> = ({ code, message }) => {
  return (
    <Box 
      sx={{
        height: 300, 
        display: 'flex', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1.5,
        textAlign: 'center'
      }}>
          <Typography variant="h2" sx={{color: 'error.main', fontWeight: 600}}>Oops!</Typography>
          <Typography variant="h3" >{message}</Typography>
          <Typography variant="body1">Error code: {code}</Typography>
    </Box>
  )
}

export default ErrorMessage