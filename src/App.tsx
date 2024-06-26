import Container from '@mui/material/Container'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'

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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Navigate to='/'/>} />
          </Routes>
        </BrowserRouter>
    </Container>
  )
}

export default App
