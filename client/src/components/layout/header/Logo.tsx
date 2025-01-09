import { Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Box component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
      <Typography variant="h6" component="span">
        Gratitude
      </Typography>
    </Box>
  )
} 