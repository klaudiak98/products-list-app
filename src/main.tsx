import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: '#5b6060'
    },
    error: {
      main: '#f44336'
    }
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: 600,
      '@media (max-width: 768px)': {
        fontSize: "3rem"
      }
    },
    h2: {
      fontSize: "3.5rem",
      fontWeight: 500,
      '@media (max-width: 768px)': {
        fontSize: "2rem"
      }
    },
    h3: {
      fontSize: "1.75rem"
    },
    h4: {
      fontSize: "1.3rem"
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
