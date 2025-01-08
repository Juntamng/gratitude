import { FC } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom'
import { theme } from './config/theme'
import { store } from './store/store'
import { Header } from './components/layout/header'
import MainContainer from './components/layout/MainContainer'
import { routes } from './routes'

const AppRoutes = () => {
  return useRoutes(routes);
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.default'
            }}
          >
            <Header />
            <MainContainer>
              <AppRoutes />
            </MainContainer>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
