import { FC } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Typography, Container } from '@mui/material'
import { Provider } from 'react-redux'
import { theme } from './config/theme'
import { store } from './store/store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              React + TypeScript + Vite + Material UI + Redux
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </Provider>
  )
}

export default App
