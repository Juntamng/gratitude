import { FC } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  CardMedia,
  Tooltip,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import ShareIcon from '@mui/icons-material/Share'
import { Gratitude } from '../../types/gratitude'
import { useToggleLikeMutation } from '../../store/features/gratitudeApi'
import { useAppSelector } from '../../store/store'

interface GratitudeCardProps {
  gratitude: Gratitude;
}

export const GratitudeCard: FC<GratitudeCardProps> = ({ gratitude }) => {
  const [toggleLike] = useToggleLikeMutation();
  const userId = useAppSelector(state => state.auth.user?.id);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const isLiked = gratitude.liked_by.includes(userId || '');

  const handleLike = async () => {
    if (!isAuthenticated) return;
    try {
      await toggleLike(gratitude.id);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  // const handleShare = () => {
  //   if (!isAuthenticated) return;
  //   // Share functionality here
  // };

  const buttonStyles = {
    '&.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.26)',
    },
    padding: '4px',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent',
      outline: 'none'
    },
    '&.MuiIconButton-root': {
      borderRadius: 0
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
          {gratitude.likes} {gratitude.likes === 1 ? 'like' : 'likes'}
        </Typography>
        <div>
          <Tooltip title={!isAuthenticated ? "Login to like posts" : ""}>
            <span>
              <IconButton 
                size="small" 
                onClick={handleLike}
                color={isLiked ? 'primary' : 'default'}
                disabled={!isAuthenticated}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                sx={buttonStyles}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </span>
          </Tooltip>
          {/* <Tooltip title={!isAuthenticated ? "Login to share posts" : ""}>
            <span>
              <IconButton 
                size="small"
                onClick={handleShare}
                disabled={!isAuthenticated}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                sx={buttonStyles}
              >
                <ShareIcon />
              </IconButton>
            </span>
          </Tooltip> */}
        </div>
      </CardContent>
    </Card>
  );
};
