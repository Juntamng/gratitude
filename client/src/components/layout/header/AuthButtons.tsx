import { FC, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../../store/store'
import { logout } from '../../../store/features/authSlice'
import LoginModal from '../../auth/LoginModal'
import { SignupModal } from '../../auth/SignupModal'

export const AuthButtons: FC = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
  }

  const switchToLogin = () => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
  }

  const switchToSignup = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(true)
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {isAuthenticated ? (
          <>
            <Typography sx={{ alignSelf: 'center' }}>
              Welcome, {user?.name}
            </Typography>
            <Button 
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button 
              color="inherit"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={() => setIsSignupModalOpen(true)}
            >
              Sign Up
            </Button>
          </>
        )}
      </Box>

      <LoginModal 
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={switchToSignup}
      />
      <SignupModal 
        open={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={switchToLogin}
      />
    </>
  )
} 