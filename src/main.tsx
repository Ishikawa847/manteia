import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider} from "@mui/material/styles";
import { Container, CssBaseline} from "@mui/material";
import './index.css'
import App from './App.tsx'
import {theme} from "./theme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="sm" sx={{ py: 4 }}>
    <App />
          </Container>
      </ThemeProvider>
  </StrictMode>,
)
