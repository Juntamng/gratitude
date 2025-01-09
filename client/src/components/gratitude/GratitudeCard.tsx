import { FC } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  CardMedia,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { Gratitude } from '../../types/gratitude'
import { useLikeGratitudeMutation } from '../../store/features/gratitudeApi'

interface GratitudeCardProps {
  gratitude: Gratitude;
}

export const GratitudeCard: FC<GratitudeCardProps> = ({ gratitude }) => {
  const [likeGratitude] = useLikeGratitudeMutation();

  const handleLike = async () => {
    try {
      await likeGratitude(gratitude.id);
    } catch (error) {
      console.error('Failed to like:', error);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: '100%',
        borderRadius: 2,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      {gratitude.imageUrl && (
        <CardMedia
          component="img"
          image={gratitude.imageUrl}
          alt="Gratitude"
          sx={{
            height: 200,
            objectFit: 'cover'
          }}
        />
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {gratitude.author[0].toUpperCase()}
          </Avatar>
        }
        title={gratitude.author}
        subheader={new Date(gratitude.date).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body1">
          {gratitude.content}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          {gratitude.likes} likes
        </Typography>
        <div>
          <IconButton size="small" onClick={handleLike}>
            <FavoriteIcon />
          </IconButton>
          <IconButton size="small">
            <ShareIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};
