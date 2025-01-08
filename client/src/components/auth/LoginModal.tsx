import { 
  Button, 
  Modal, 
  Box, 
  Typography, 
  TextField,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { useLoginMutation, setCredentials } from '../../store/features/authSlice';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const LoginModal = ({ open, onClose, onSwitchToSignup }: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(formData).unwrap();
      dispatch(setCredentials(result));
      onClose();
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(error as any)?.data?.message || 'Login failed'}
          </Alert>
        )}
        
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" component="span">
              Don't have an account?{' '}
            </Typography>
            <Button
              variant="text"
              onClick={onSwitchToSignup}
              sx={{ p: 0, minWidth: 'auto' }}
            >
              Sign up
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default LoginModal; 