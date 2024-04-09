import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const Loading = () => {
  return (
    <Box sx={{height: 200, alignSelf:'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress size="70px"/>
    </Box>
  )
}

export default Loading