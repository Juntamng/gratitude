import { FC } from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  useTheme, 
  useMediaQuery,
  Container
} from '@mui/material'
import { AuthButtons } from './AuthButtons'

export const Header: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            px: { xs: 1, sm: 2 },
            minHeight: { xs: 56, sm: 64 }
          }}
          disableGutters
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            component="h1"
            sx={{ 
              fontWeight: 'bold',
              background: theme.palette.primary.main,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              flexGrow: 0
            }}
          >
            Gratitude
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AuthButtons />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
} 