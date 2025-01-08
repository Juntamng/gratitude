import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useAppSelector } from '../../../store/store'

export const AuthButtons: FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {isAuthenticated ? (
        <>
          <Typography sx={{ alignSelf: 'center' }}>
            Welcome, {user?.name}
          </Typography>
          <Button color="inherit">Logout</Button>
        </>
      ) : (
        <>
          <Button color="inherit">Login</Button>
          <Button 
            variant="contained" 
            color="secondary"
          >
            Sign Up
          </Button>
        </>
      )}
    </Box>
  )
} 