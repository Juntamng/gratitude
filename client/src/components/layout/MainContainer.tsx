import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        minHeight: 'calc(100vh - 64px)', // Subtracting AppBar height
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </Container>
  );
};

export default MainContainer; 