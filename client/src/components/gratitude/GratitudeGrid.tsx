import { FC, useState } from 'react'
import { Box, CircularProgress, Fab, useTheme, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Masonry from '@mui/lab/Masonry'
import { GratitudeCard } from './GratitudeCard'
import { CreateGratitudeModal } from './CreateGratitudeModal'
import { useGetGratitudesQuery } from '../../store/features/gratitudeApi'
import { useAppSelector } from '../../store/store'

export const GratitudeGrid: FC = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const { data: gratitudes = [], isLoading } = useGetGratitudesQuery();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', p: isMobile ? 0 : 3 }}>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={isMobile ? 1 : 3}
        sx={{
          width: 'auto',
          margin: isMobile ? 0 : undefined,
          '& .MuiMasonry-item': {
            paddingBottom: isMobile ? '10px' : 0,
            '&:last-child': {
              paddingBottom: isMobile ? '24px' : 0
            }
          }
        }}
      >
        {gratitudes.map((gratitude) => (
          <GratitudeCard
            key={gratitude.id}
            gratitude={gratitude}
            isMobile={isMobile}
          />
        ))}
      </Masonry>
      {isAuthenticated && (
        <Fab
          color="primary"
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16,
            '&:focus': {
              outline: 'none'
            }
          }}
          onClick={() => setCreateOpen(true)}
        >
          <AddIcon />
        </Fab>
      )}
      <CreateGratitudeModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </Box>
  );
};