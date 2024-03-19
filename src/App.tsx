import { Typography, Container } from '@mui/material'
import './App.css'

function App() {

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant='h1' color='primary.main'>Hello World</Typography>
    </Container>
  )
}

export default App
