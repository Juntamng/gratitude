import { FC } from 'react'
import {
  AppBar,
  Container,
  Toolbar,
} from '@mui/material'
import { Logo } from './Logo'
import { AuthButtons } from './AuthButtons'

export const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Logo />
          <AuthButtons />
        </Toolbar>
      </Container>
    </AppBar>
  )
} 