import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          color: '#333',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          '@media (min-width: 0px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 0px)': {
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: 0
          },
          '@media (min-width: 600px)': {
            paddingLeft: 16,
            paddingRight: 16,
          }
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        TransitionProps: { timeout: 200 }
      },
      styleOverrides: {
        paper: {
          marginTop: 8,
          minWidth: 200,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          '& .MuiMenuItem-root': {
            padding: '10px 16px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              transform: 'translateX(4px)'
            },
            '& .MuiListItemIcon-root': {
              minWidth: 36,
              color: 'inherit',
              transition: 'transform 0.2s ease',
            },
            '&:hover .MuiListItemIcon-root': {
              transform: 'scale(1.1)'
            }
          },
          '& .MuiDivider-root': {
            margin: '8px 0'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          },
          '&:active': {
            transform: 'scale(0.95)'
          }
        }
      }
    }
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
}); 