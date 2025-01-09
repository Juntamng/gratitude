import { FC, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material'
import { useCreateGratitudeMutation } from '../../store/features/gratitudeApi'
import { CreateGratitudeDto } from '../../types/gratitude'

interface CreateGratitudeModalProps {
  open: boolean
  onClose: () => void
}

export const CreateGratitudeModal: FC<CreateGratitudeModalProps> = ({ open, onClose }) => {
  const [createGratitude] = useCreateGratitudeMutation()
  const [formData, setFormData] = useState<CreateGratitudeDto>({
    content: '',
    imageUrl: ''
  })

  const handleSubmit = async () => {
    try {
      await createGratitude(formData).unwrap()
      onClose()
      setFormData({ content: '', imageUrl: '' })
    } catch (error) {
      console.error('Failed to create gratitude:', error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share Your Gratitude</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="What are you grateful for?"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL (optional)"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={!formData.content.trim()}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  )
} 