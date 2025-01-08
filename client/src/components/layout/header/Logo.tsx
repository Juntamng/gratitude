import { FC } from 'react'
import { Typography } from '@mui/material'

export const Logo: FC = () => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <img 
        src="/logo.svg" 
        alt="Logo" 
        style={{ height: '32px' }}
      />
      Your App
    </Typography>
  )
} 