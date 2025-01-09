import { FC, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../../store/store'
import { logout } from '../../../store/features/authSlice'
import LoginModal from '../../auth/LoginModal'
import SignupModal from '../../auth/SignupModal'
import { CreateGratitudeModal } from '../../gratitude/CreateGratitudeModal'

export const AuthButtons: FC = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)

  const switchToSignup = () => {
    setLoginOpen(false)
    setSignupOpen(true)
  }

  const switchToLogin = () => {
    setSignupOpen(false)
    setLoginOpen(true)
  }

  if (!isAuthenticated) {
    return (
      <>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => setLoginOpen(true)}>
            Login
          </Button>
          <Button variant="contained" onClick={() => setSignupOpen(true)}>
            Sign Up
          </Button>
        </Stack>
        <LoginModal 
          open={loginOpen} 
          onClose={() => setLoginOpen(false)} 
          onSwitchToSignup={switchToSignup}
        />
        <SignupModal 
          open={signupOpen} 
          onClose={() => setSignupOpen(false)}
          onSwitchToLogin={switchToLogin}
        />
      </>
    )
  }

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Welcome, {user?.name}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setCreateOpen(true)}
        >
          Share Gratitude
        </Button>
        <Button 
          variant="outlined"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </Stack>
      <CreateGratitudeModal 
        open={createOpen} 
        onClose={() => setCreateOpen(false)} 
      />
    </>
  )
} 