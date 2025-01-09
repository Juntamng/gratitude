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
import { setCredentials } from '../../store/features/authSlice';
import { useSignupMutation } from '../../store/features/authApi';

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal = ({ open, onClose, onSwitchToLogin }: SignupModalProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [signup, { isLoading, error }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signup(formData).unwrap();
      dispatch(setCredentials(result));
      onClose();
    } catch (err) {
      console.error('Failed to signup:', err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="signup-modal"
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
          Sign Up
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(error as any)?.data?.message || 'Signup failed'}
          </Alert>
        )}
        
        <Stack spacing={3}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
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
            {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" component="span">
              Already have an account?{' '}
            </Typography>
            <Button
              variant="text"
              onClick={onSwitchToLogin}
              sx={{ p: 0, minWidth: 'auto' }}
            >
              Login
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SignupModal; 