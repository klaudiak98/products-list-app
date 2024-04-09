import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import { ProductsProvider } from './context/ProductsContext'

function App() {

  return (
    <Container 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 3
      }}>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Navigate to='/'/>} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </Container>
  )
}

export default App
