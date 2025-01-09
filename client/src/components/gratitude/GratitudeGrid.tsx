import { FC, useState } from 'react'
import { Box, CircularProgress, Fab } from '@mui/material'
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

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', p: 3 }}>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={3}
      >
        {gratitudes.map((gratitude) => (
          <GratitudeCard
            key={gratitude.id}
            gratitude={gratitude}
          />
        ))}
      </Masonry>
      {isAuthenticated && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
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