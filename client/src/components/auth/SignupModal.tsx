import { FC, useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Stack,
  InputAdornment,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import GoogleIcon from '@mui/icons-material/Google'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useAppDispatch } from '../../store/store'
import { login } from '../../store/features/authSlice'

interface SignupModalProps {
  open: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export const SignupModal: FC<SignupModalProps> = ({ 
  open, 
  onClose,
  onSwitchToLogin 
}) => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(login({
        email,
        password
      })).unwrap();
      onClose()
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="signup-modal"
    >
      <Box
        component="form"
        onSubmit={handleSignup}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" component="h2" textAlign="center" mb={1}>
          Welcome to Your App
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Find new ideas to try
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          
          <TextField
            fullWidth
            label="Create a password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
          >
            Continue
          </Button>

          <Divider>OR</Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            size="large"
          >
            Continue with Google
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already a member?{' '}
              <Button
                variant="text"
                sx={{ p: 0, minWidth: 'auto' }}
                onClick={onSwitchToLogin}
              >
                Log in
              </Button>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Modal>
  )
} 