import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const startServer = (portNumber: number) => {
  return app.listen(portNumber, () => {
    console.log(`Server is running on port ${portNumber}`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${portNumber} is busy, trying ${portNumber + 1}`);
      startServer(portNumber + 1);
    } else {
      console.error(err);
    }
  });
};

const server = startServer(port);

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
  });
}); 