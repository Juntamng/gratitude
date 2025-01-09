import { FC } from 'react'
import { AppBar, Toolbar, Container } from '@mui/material'
import { Logo } from './Logo'
import { AuthButtons } from './AuthButtons'

export const Header: FC = () => {
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Logo />
          <AuthButtons />
        </Toolbar>
      </Container>
    </AppBar>
  )
} 