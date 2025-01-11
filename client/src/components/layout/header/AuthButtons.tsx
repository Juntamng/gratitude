import { FC, useState } from 'react'
import { 
  Button, 
  Stack, 
  Typography, 
  useMediaQuery, 
  useTheme,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector, useAppDispatch } from '../../../store/store'
import { logout } from '../../../store/features/authSlice'
import LoginModal from '../../auth/LoginModal'
import SignupModal from '../../auth/SignupModal'
import { CreateGratitudeModal } from '../../gratitude/CreateGratitudeModal'
import PersonIcon from '@mui/icons-material/Person';

export const AuthButtons: FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const switchToSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const switchToLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGratitude = () => {
    handleMenuClose();
    setCreateOpen(true);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleMenuOpen(event as any);
    }
  };

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

  const menuItems = (
    <>
      <MenuItem 
        onClick={handleCreateGratitude}
        sx={{ 
          '&:hover .MuiListItemIcon-root': { 
            color: theme.palette.primary.main 
          }
        }}
      >
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        Share Gratitude
      </MenuItem>
      <Divider />
      <MenuItem 
        onClick={handleLogout}
        sx={{ 
          '&:hover .MuiListItemIcon-root': { 
            color: theme.palette.error.main 
          }
        }}
      >
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  );

  const commonMenuProps = {
    anchorEl,
    open: Boolean(anchorEl),
    onClose: handleMenuClose,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    sx: {
      '& .MuiPaper-root': {
        overflow: 'visible',
        mt: 1.5,
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        {!isMobile && (
          <Typography>Welcome, {user?.name}</Typography>
        )}
        <Tooltip title="Profile Menu">
          <IconButton 
            onClick={handleMenuOpen}
            onKeyDown={handleKeyDown}
            aria-label="profile menu"
            aria-controls={Boolean(anchorEl) ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            sx={{
              '&:focus': {
                outline: 'none'
              },
              padding: 0,
              '&:hover .MuiAvatar-root': {
                transform: 'scale(1.05)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: theme.palette.primary.main,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark
                }
              }}
            >
              {user?.name?.[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          id={isMobile ? "profile-menu-mobile" : "profile-menu"}
          {...commonMenuProps}
        >
          {isMobile && (
            <>
              <MenuItem disabled>
                <Typography variant="subtitle2">
                  Welcome, {user?.name}
                </Typography>
              </MenuItem>
              <Divider />
            </>
          )}
          {menuItems}
        </Menu>
      </Stack>
      <CreateGratitudeModal 
        open={createOpen} 
        onClose={() => setCreateOpen(false)} 
      />
    </>
  )
} 